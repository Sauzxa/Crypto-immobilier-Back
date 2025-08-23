# Crypto Immobilier Backend

A secure and scalable Node.js backend for managing real estate reservations, built with Express.js, TypeScript, and MongoDB.

## Features

- 🚀 **Express.js** with TypeScript
- 🔐 **JWT Authentication** with super admin access
- 🔒 **Secure Password Hashing** with bcrypt
- 🚪 **Login/Logout System** with token invalidation
- 🛡️ **Protected Routes** - All reservation endpoints require authentication
- 🛡️ **Security middlewares** (Helmet, CORS, NoSQL injection protection)
- 📝 **Request logging** with Morgan
- 🗄️ **MongoDB** integration with Mongoose
- 🏠 **Reservation Management System** with full CRUD operations
- ✅ **Data Validation** with custom validation utilities
- 📊 **Statistics Endpoints** for tracking reservations
- 👑 **Super Admin Management** with automated seeding
- 🔧 **Development tools** (Nodemon, TypeScript compilation)
- ⚡ **Hot reload** for development
- 🔒 **Environment-based configuration**
- 💥 **Comprehensive error handling**
- 🎯 **Graceful shutdown handling**
- 📁 **Modular Architecture** with separate routes, controllers, models, and utilities

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-immobilier-back
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/crypto-immobilier

   # Frontend Configuration (for CORS)
   FRONTEND_URL=http://localhost:3000

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=30d
   ```

## Scripts

- **Development**: `npm run dev` - Start with hot reload
- **Build**: `npm run build` - Compile TypeScript to JavaScript
- **Production**: `npm start` - Run compiled JavaScript
- **Type Check**: `npx tsc --noEmit` - Check TypeScript types


## Project Structure

```
src/
├── app.ts                    # Express app configuration and middleware
├── server.ts                 # Server startup and database connection
├── controllers/
│   ├── userController.ts     # Business logic for reservations
│   └── authController.ts     # Authentication logic (login/logout)
├── models/
│   ├── User.ts              # MongoDB schema for reservations
│   └── Admin.ts             # MongoDB schema for admin
├── routes/
│   ├── userRoutes.ts        # API route definitions for reservations
│   └── authRoutes.ts        # API route definitions for authentication
├── middleware/
│   ├── errorHandler.ts      # Global error handling middleware
│   └── auth.ts              # JWT authentication middleware
└── utils/
    ├── errors.ts            # Custom error classes
    ├── validation.ts        # Input validation utilities
    └── asyncHandler.ts      # Async error wrapper

dist/                        # Compiled JavaScript (generated)
```

## API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Health Check
- **GET** `/health` - Server health check

### Authentication

#### 1. Initial Admin Setup (One-time)
- **POST** `/api/auth/setup`
- **Description**: Create the initial admin account (only works if no admin exists)
- **Request Body**:
  ```json
  {
    "email": "crypto.immobilier@gmail.com",
    "password": "crypto_2222"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Initial admin created successfully",
    "data": {
      "admin": {
        "id": "64f7b8c9e12345678901234a",
        "email": "crypto.immobilier@gmail.com"
      }
    }
  }
  ```

#### 2. Admin Login
- **POST** `/api/auth/login`
- **Description**: Admin login to get JWT token
- **Request Body**:
  ```json
  {
    "email": "crypto.immobilier@gmail.com",
    "password": "crypto_2222"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "admin": {
        "id": "64f7b8c9e12345678901234a",
        "email": "crypto.immobilier@gmail.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### 3. Admin Logout
- **POST** `/api/auth/logout`
- **Description**: Logout admin and invalidate token
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

### Reservation Management (Protected Routes)

**Note**: All reservation endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### 1. Create Reservation
- **POST** `/api/users`
- **Description**: Submit a new reservation form
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "number": "+1234567890",
    "message": "Interested in a 2-bedroom apartment",
    "apartmentType": "2BR Deluxe"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Reservation created successfully",
    "data": {
      "id": "64f7b8c9e12345678901234a",
      "name": "John Doe",
      "number": "+1234567890",
      "message": "Interested in a 2-bedroom apartment",
      "apartmentType": "2BR Deluxe",
      "date": "2023-09-05T10:30:00.000Z",
      "status": "Pending"
    }
  }
  ```

#### 2. Get All Reservations
- **GET** `/api/users`
- **Description**: Retrieve all reservations (sorted by newest first)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Users retrieved successfully",
    "count": 2,
    "data": [...]
  }
  ```

#### 3. Update Reservation Status
- **PUT** `/api/users/:id/status`
- **Description**: Update the status of a specific reservation
- **Request Body**:
  ```json
  {
    "status": "Done"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Reservation status updated successfully",
    "data": {
      "id": "64f7b8c9e12345678901234a",
      "status": "Done",
      ...
    }
  }
  ```

### Statistics Endpoints

#### 4. Total Reservations Count
- **GET** `/api/users/count`
- **Response**:
  ```json
  {
    "success": true,
    "count": 15
  }
  ```

#### 5. Completed Reservations Count
- **GET** `/api/users/count/done`
- **Response**:
  ```json
  {
    "success": true,
    "count": 8
  }
  ```

#### 6. Pending Reservations Count
- **GET** `/api/users/count/pending`
- **Response**:
  ```json
  {
    "success": true,
    "count": 7
  }
  ```

### Data Model

#### Reservation Schema
```typescript
{
  name: string;          // Required, max 100 characters
  number: string;        // Required, max 20 characters
  message: string;       // Required, max 1000 characters
  apartmentType: string; // Required, max 50 characters
  date: Date;           // Auto-generated timestamp
  status: "Pending" | "Done"; // Default: "Pending"
  id: string;           // Auto-generated MongoDB ObjectId
}
```

### Error Responses

All endpoints return consistent error responses:
```json
{
  "success": false,
  "error": {
    "message": "Validation failed: Name is required"
  }
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Validation Error
- `404` - Not Found
- `500` - Server Error

## Security Features

- **JWT Authentication**: Secure token-based authentication for admin access
- **Password Hashing**: Bcrypt with salt for secure password storage
- **Token Blacklisting**: Logout system invalidates tokens
- **Route Protection**: All reservation endpoints require authentication
- **Helmet**: Sets security-related HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **NoSQL Injection Protection**: Sanitizes user input
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Prevents sensitive information leakage
- **Async Error Handling**: Proper error catching for all async operations

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `JWT_SECRET` | Secret key for JWT token signing | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `30d` |

## Development

1. **Start MongoDB** (if running locally)
2. **Run development server**:
   ```bash
   npm run dev
   ```
3. **Create Initial Admin** (using Postman or any HTTP client):
   - **POST** `http://localhost:8000/api/auth/setup`
   - **Body**: `{ "email": "crypto.immobilier@gmail.com", "password": "crypto_2222" }`
4. **Server will be ready** at `http://localhost:8000`

## Production Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start the server**:
   ```bash
   npm start
   ```

## Error Handling

The application includes comprehensive error handling:
- Global error middleware
- Graceful shutdown on SIGTERM/SIGINT
- MongoDB connection error handling
- Environment validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
