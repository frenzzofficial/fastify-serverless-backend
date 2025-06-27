
import * as arctic from "arctic";
import { envGoogleClient, envJWTServices } from "../constants/config.env";
import type { FastifyReply, FastifyRequest } from "fastify";
import LocalUserModel from "../models/model.LocalUsers";
import SocialUserModel from "../models/model.SocialUsers";
// import { setCookie } from "../utils/cookies/cookie.helper";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import { setCookie } from "../utils/cookies/cookie.helper";

const clientId = envGoogleClient.GOOGLE_CLIENT_ID;
const clientSecret = envGoogleClient.GOOGLE_CLIENT_SECRET;
const redirectURI = envGoogleClient.GOOGLE_REDIRECT_URL;

export const google = new arctic.Google(clientId, clientSecret, redirectURI);

// --- Google Sign-In Redirect Handler ---
export const UserRedirectToGoogleSignin = async (_req: FastifyRequest, reply: FastifyReply) => {
    const googleState = arctic.generateState();
    const googleCodeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const googleAuthorizationURL = google.createAuthorizationURL(googleState, googleCodeVerifier, scopes);

    // Set cookies for PKCE and state
    reply
        .setCookie("google_oauth_state", googleState, {
            path: "/",
            httpOnly: true,
            secure: true,
            // secure: process.env.NODE_ENV === "production", // true in prod, false in dev
            sameSite: "none",
            maxAge: 10 * 60, // 10 minutes
        })
        .setCookie("google_oauth_verifier", googleCodeVerifier, {
            path: "/",
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            secure: true,
            sameSite: "none",
            maxAge: 10 * 60,
        });

    // Redirect directly to Google
    return reply.redirect(googleAuthorizationURL.toString(), 302);
};

// --- Google OAuth Callback Handler ---
export const UserCallbackFromGoogle = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        // Get cookies
        const storedState = req.cookies?.google_oauth_state;
        const codeVerifier = req.cookies?.google_oauth_verifier;

        if (!storedState || !codeVerifier) {
            return reply.status(400).send({ message: "Missing OAuth state or code verifier" });
        }

        // Get code and state from query
        const { code, state } = req.query as { code?: string; state?: string };
        if (!code || !state) {
            return reply.status(400).send({ message: "Missing code or state" });
        }

        // Validate state
        if (state !== storedState) {
            return reply.status(400).send({ message: "Invalid state" });
        }

        // Exchange code for tokens
        let tokens: arctic.OAuth2Tokens;
        try {
            tokens = await google.validateAuthorizationCode(code, codeVerifier);
        } catch {
            return reply.status(401).send({ message: "Failed to exchange code for tokens" });
        }

        // Decode ID token to get user info
        let googleUser;
        try {
            googleUser = arctic.decodeIdToken(tokens.idToken());
        } catch {
            return reply.status(401).send({ message: "Failed to fetch user info from Google" });
        }

        // Extract user info (adjust property names as needed)
        const {
            sub: googleUserId,
            name: googleName,
            picture: googleProfileImage,
            email: googleUserEmail
        } = googleUser as { sub: string, name: string, picture: string, email: string };

        // Find or create user in your DB
        let user = await LocalUserModel.findOne({ where: { email: googleUserEmail } });
        let userId;
        if (!user) {
            const newUser = await SocialUserModel.create({
                uid: crypto.randomUUID(),
                email: googleUserEmail,
                name: googleName,
                provider: "google",
                providerId: googleUserId,
                image: googleProfileImage,
                role: "DEFAULT",
            });
            userId = newUser.dataValues.id;
        } else {
            userId = user.dataValues.id;
        }

        // Generate JWT tokens
        const accessToken = JWT.sign(
            { id: userId },
            envJWTServices.JWT_ACCESS_TOKEN,
            { expiresIn: "15m" }
        );
        const refreshToken = JWT.sign(
            { id: userId },
            envJWTServices.JWT_REFRESH_TOKEN,
            { expiresIn: "7d" }
        );

        // Set JWT cookies
        setCookie(reply, "access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: "lax",
            // path: "/"
        });
        setCookie(reply, "refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            // sameSite: "lax",
            // path: "/"
        });

        // Redirect to frontend dashboard
        return reply.redirect("http://localhost:3000/dashboard");
    } catch (error) {
        return reply.status(500).send({ message: "Internal server error" });
    }
};