import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGODB_URI;

// Validate required environment variables
if (!MONGO_URL) {
  console.error('Error: MONGODB_URI environment variable is required');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err: any) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  mongoose.connection.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});