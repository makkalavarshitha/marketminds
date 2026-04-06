const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./src/config/database');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middleware/errorHandler');

// Load env vars FIRST
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Test route (IMPORTANT for debugging)
app.get('/', (req, res) => {
  res.send('API running...');
});

// Routes
app.use('/api', routes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});