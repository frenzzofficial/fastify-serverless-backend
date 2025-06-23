# Fastify Serverless Backend

This project is a serverless backend built with Fastify, TypeScript, and MySQL, designed for deployment on Vercel. It provides a modular structure for easy management of API routes and business logic.

## Features

- Fastify framework for high performance
- TypeScript for type safety and modern JavaScript features
- MySQL integration for data persistence
- Serverless deployment on Vercel

## Project Structure

```
fastify-serverless-backend
├── src
│   ├── api
│   │   └── index.ts          # Entry point for the API
│   ├── modules
│   │   ├── user
│   │   │   ├── user.controller.ts  # User-related API request handlers
│   │   │   ├── user.service.ts     # Business logic for user management
│   │   │   └── user.model.ts       # User data structure and database interaction
│   │   └── index.ts          # Exports all modules
│   ├── db
│   │   └── mysql.ts          # MySQL database connection
│   └── types
│       └── index.ts          # TypeScript interfaces and types
├── vercel.json               # Vercel deployment configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env.example               # Example environment variables
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone <repository-url>
   cd fastify-serverless-backend
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in your database connection details.

4. Build the project:

   ```
   pnpm build
   ```

5. Deploy to Vercel:
   ```
   vercel
   ```

## Usage

- Start the development server:

  ```
  pnpm start
  ```

- API Endpoints:
  - `POST /users` - Create a new user
  - `GET /users/:id` - Retrieve a user by ID
  - `PUT /users/:id` - Update a user by ID
  - `DELETE /users/:id` - Delete a user by ID

## License

This project is licensed under the ISC License.
