# Mabsco Backend

## 📌 Table of Contents
- [About Mabsco](#about-mabsco)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎮 About Mabsco
Mabsco is a gaming community platform designed to connect gamers through discussion threads, gaming sessions, and shared experiences. This repository contains the backend of Mabsco, built using **NestJS**, providing a powerful API for handling users, threads, comments, likes, and authentication.

## 🚀 Features
- ✅ User authentication with **NextAuth.js**
- 📢 Create, update, and delete 
- 💬 Comment on posts
- ❤️ Like posts
- 👤 User profile management
- 📊 Real-time data handling
- 🛡 Secure API with authentication & authorization

## 🛠 Tech Stack
- **Backend Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (JWT-based authentication)
- **API Communication**: REST API
- **Validation**: Zod

## 📁 Project Structure
```
mabsco-back/
├── prisma/            # Prisma schema and migrations
├── src/
│   ├── auth/         # Authentication logic (JWT, sessions)
│   ├── common/       # Shared utilities and DTOs
│   ├── config/       # Environment configuration
│   ├── database/     # Prisma service and database connection
│   ├── threads/      # Thread module (CRUD operations)
│   ├── comments/     # Comment module
│   ├── likes/        # Like functionality
│   ├── users/        # User module (profile, settings)
│   ├── main.ts       # Entry point
│   ├── app.module.ts # Main module
├── .env              # Environment variables
├── .gitignore        # Ignored files
├── package.json      # Dependencies and scripts
├── README.md         # Documentation
└── tsconfig.json     # TypeScript configuration
```

## 🛠 Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/syahrulj6/mabsco-back.git
cd mabsco-back
```

### 2️⃣ Install dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Setup the database
Ensure you have **PostgreSQL** installed and running. Then, create the database:
```sh
npx prisma migrate dev --name init
```

### 4️⃣ Run the application
```sh
npm run start:dev  # Development mode
```

The server will start on `http://localhost:3001` (default port).

## 🔑 Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```ini
DATABASE_URL=postgresql://user:password@localhost:5432/mabsco
JWT_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret
```

Modify values based on your setup.

## 📡 API Documentation
Mabsco's backend follows RESTful API principles. Once the server is running, you can explore the API endpoints via:
```
http://localhost:3001/api
```
You can also use **Postman** or **Swagger** (if integrated) to test endpoints.

## 🤝 Contributing
Contributions are welcome! Feel free to submit issues and pull requests.
