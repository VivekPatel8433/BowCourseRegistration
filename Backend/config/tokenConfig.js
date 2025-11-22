import dotenv from 'dotenv';
dotenv.config();
// Export configuration options
export default {
  jwtSecret: process.env.JWT_SECRET,         // Secret key for signing JWT tokens
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,  // Expiration time for JWT tokens
  port: process.env.PORT || 3000,            // Port the server will listen on
};