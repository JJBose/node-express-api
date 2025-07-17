const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Fake token generator (not secure, just for demo)
function generateToken(username) {
  return Buffer.from(`${username}:${Date.now()}`).toString('base64');
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(username);
  res.json({ token });
});

module.exports = router;
