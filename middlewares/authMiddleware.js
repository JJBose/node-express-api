const users = require('../data/users');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [username] = decoded.split(':');

    const userExists = users.find(u => u.username === username);
    if (!userExists) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = { username };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
