const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const AuthRoutes = require('./Routes/user');
const VideoRoutes = require('./Routes/video');
const CommentRoutes = require('./Routes/comment');
const cors = require('cors');

// Enable CORS to allow requests from your frontend and pass cookies
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Allows cookies to be sent with requests
}));

app.use(express.json()); // To parse incoming JSON requests
app.use(cookieParser()); // To parse cookies

// Require database connection
require('./Connection/conn');

// Routes for different parts of your API
app.use('/auth', AuthRoutes);   // Authentication routes
app.use('/api', VideoRoutes);   // Video-related routes
app.use('/commApi', CommentRoutes); // Comment-related routes

// Start server
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
