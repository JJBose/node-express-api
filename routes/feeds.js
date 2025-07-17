const express = require('express');
const router = express.Router();
const feeds = require('../data/feeds');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedFeeds = feeds.slice(start, end);

  res.json({
    page,
    limit,
    total: feeds.length,
    feeds: paginatedFeeds
  });
});

module.exports = router;
