const express = require("express");
const router = express.Router();
const feeds = require("../data/feeds");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
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
    feeds: paginatedFeeds,
  });
});

router.post("/", authMiddleware, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const feeds = require("../data/feeds");

  const newId = feeds.length > 0 ? feeds[feeds.length - 1].id + 1 : 1;
  const newFeed = {
    id: newId,
    title,
    content,
  };

  feeds.push(newFeed);

  res.status(201).json({ message: "Feed created", id: newId });
});

router.put("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const feeds = require("../data/feeds"); // In-memory array

  const feedIndex = feeds.findIndex((feed) => feed.id === parseInt(id));

  if (feedIndex === -1) {
    return res.status(404).json({ message: "Feed not found" });
  }

  // Update the feed
  feeds[feedIndex].title = title;
  feeds[feedIndex].content = content;

  res.json({ message: "Feed updated" });
});

module.exports = router;
