import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log('Headers:', req.headers); // Log request headers

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('Authentication token missing');
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  console.log('Extracted Token:', token); // Log extracted token

  if (!token) {
    console.log('Token is empty');
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Log decoded token

    if (!decoded || !decoded.id) {
      console.log('Invalid token payload:', decoded);
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = decoded; // Attach user details to request
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message); // Log error details
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
