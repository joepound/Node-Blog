const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h1>Node Blog</h1>
    <p>Welcome to the Node Blog!</p>
  `)
});

module.exports = router;