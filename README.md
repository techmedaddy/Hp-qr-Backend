# QR Code Management System

## Project Overview
The QR Code Management System is a Node.js application that enables users to generate, manage, and track static and dynamic QR codes. This system supports user authentication, QR code generation, and analytics for event tracking.

![WhatsApp Image 2024-11-29 at 03 24 34_83345204](https://github.com/user-attachments/assets/d0a1516c-1c37-4cbf-a78a-063c9d68dfec)


## Features
- **User Authentication**:
  - Signup and login using JWT-based authentication.
  - Rate-limiting to prevent brute-force attacks.

- **QR Code Management**:
  - Generate static and dynamic QR codes.
  - Store metadata for QR codes (e.g., descriptions and campaigns).
  - Update URLs for dynamic QR codes.

- **Event Tracking**:
  - Log QR code scans with device, location, and IP data.
  - View analytics like total scans, unique users, and location-based statistics.

- **Rate Limiting**:
  - Protect sensitive APIs like authentication and QR code generation.
# Technologies Used

## Backend
- **Node.js** with **Express.js** for building the REST APIs.

## Database
- **MongoDB** (with **Mongoose ODM**) to store user and QR code data.

## Authentication
- **JSON Web Tokens (JWT)** for user authentication.

## Middleware
- **express-rate-limit** for rate limiting sensitive APIs.

## QR Code Generation
- **qrcode** library for generating QR code images.

## Environment Configuration
- **dotenv** for managing environment variables.
# Installation and Setup

## Prerequisites
Ensure the following tools are installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- [Docker (optional)](https://www.docker.com/)


## Steps to Run the Project

 **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd qr-code-management
### Project structure

```bash
qr-code-management/
│
├── config/                 # Configuration files
│   └── db.js               # MongoDB connection setup
│
├── middlewares/            # Custom middlewares
│   ├── authenticate.js     # JWT-based authentication middleware
│   ├── rateLimiter.js      # Middleware for rate limiting specific routes
│
├── models/                 # Mongoose schemas for MongoDB
│   ├── user.js             # Schema for user data
│   ├── qr_code.js          # Schema for QR code data
│   ├── event.js            # Schema for tracking events
│
├── repository/             # Data access logic for the database
│   ├── userRepository.js   # Handles user-related database operations
│   ├── qrCodeRepository.js # Handles QR code-related database operations
│   ├── analyticsRepository.js # Handles analytics-related database queries
│
├── routes/                 # API route handlers
│   ├── authRoutes.js       # Routes for user authentication
│   ├── qrCodeRoutes.js     # Routes for QR code management
│   ├── eventRoutes.js      # Routes for tracking QR code events
│   ├── analyticsRoutes.js  # Routes for analytics and reports
│
├── services/               # Core business logic
│   ├── userService.js      # Business logic for user management
│   ├── qrCodeService.js    # Business logic for QR code generation and updates
│   ├── eventService.js     # Business logic for event tracking
│   ├── analyticsService.js # Business logic for QR code analytics
│
├── qrcodes/                # Folder for storing generated QR code images
│                           # (Ignored in `.gitignore` to prevent uploads to GitHub)
│
├── .gitignore              # Specifies files and folders to ignore in Git
├── app.js                  # Main application entry point
├── docker-compose.yml      # Docker Compose configuration for MongoDB
├── package.json            # NPM dependencies and project metadata
├── package-lock.json       # NPM lock file for dependency versions
└── README.md               # Project documentation
```

### Install Dependencies:

```bash
npm install
```

### Set Up Environment Variables:

Create a `.env` file in the project root with the following variables:

```makefile
PORT=3000
MONGO_URI=mongodb://localhost:27017/qr-code-management
JWT_SECRET=your_jwt_secret
```
### Run MongoDB:

If MongoDB is not already running, start it:

```bash
mongod
```

**or use docker**
``` bash
docker-compose up -d
```
### Start the Server:

```bash
npm start
```

```bash
http://localhost:3000
```
---

## Final Note
This project showcases backend development skills, including implementing secure user authentication, building RESTful APIs, managing a MongoDB database, and integrating dynamic QR code generation and tracking functionalities. It highlights practical problem-solving, clean code practices, and adherence to modern backend standards.

Thank you for taking the time to review this project!


