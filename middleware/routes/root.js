const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h2>Node Blog</h2>
    <p>Welcome to the Node Blog!</p>
  `)
});

module.exports = router;