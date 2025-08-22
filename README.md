# Crypto Immobilier Backend

A secure and scalable Node.js backend starter built with Express.js, TypeScript, and MongoDB for a crypto real estate application.

## Features

- 🚀 **Express.js** with TypeScript
- 🛡️ **Security middlewares** (Helmet, CORS, NoSQL injection protection)
- 📝 **Request logging** with Morgan
- 🗄️ **MongoDB** integration with Mongoose
- 🔧 **Development tools** (Nodemon, TypeScript compilation)
- ⚡ **Hot reload** for development
- 🔒 **Environment-based configuration**
- 💥 **Comprehensive error handling**
- 🎯 **Graceful shutdown handling**

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
   ```

## Scripts

- **Development**: `npm run dev` - Start with hot reload
- **Build**: `npm run build` - Compile TypeScript to JavaScript
- **Production**: `npm start` - Run compiled JavaScript
- **Type Check**: `npx tsc --noEmit` - Check TypeScript types

## Project Structure

```
src/
├── app.ts          # Express app configuration and middleware
├── server.ts       # Server startup and database connection
└── ...             # Add your routes, models, controllers here

dist/               # Compiled JavaScript (generated)
```

## API Endpoints

Currently includes:
- Global error handling for undefined routes
- Health check capabilities

### Adding New Routes

Create your routes in separate files and import them in `app.ts`:

```typescript
// Example: src/routes/auth.ts
import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
  // Your login logic
});

export default router;
```

```typescript
// In app.ts
import authRoutes from './routes/auth';
app.use('/api/auth', authRoutes);
```

## Security Features

- **Helmet**: Sets security-related HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **NoSQL Injection Protection**: Sanitizes user input
- **Error Handling**: Prevents sensitive information leakage

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## Development

1. **Start MongoDB** (if running locally)
2. **Run development server**:
   ```bash
   npm run dev
   ```
3. **Server will start** at `http://localhost:8000`

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
