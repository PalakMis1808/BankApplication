import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import config from './config.js';
import userRouter from './routers/userRouter.js';

// Initialize Express
const app = express();
const PORT = config.port || process.env.PORT || 5000;

// Enable JSON parsing (Important: This should be above other middleware)
app.use(express.json());

// CORS Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://bankapplication-hsep.onrender.com'], // Allow both local & hosted frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies, sessions, etc.
}));

// Explicitly handle CORS for preflight requests
app.options('*', cors());

// API Routes
app.use('/api/users', userRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
