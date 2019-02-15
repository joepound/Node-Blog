const express = require("express");
const router = express.Router();

const userDB = require("../users/dbHelper");
const postDB = require("./dbHelper");

const errors = require("./error");

router.get("/", async (req, res) => {
  console.log("\nAttempting to GET all posts...");
  try {
    const posts = await postDB.get();
    res.status(200).json({
      success: true,
      posts
    })
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.GET_ALL_POSTS_FAILURE
    })
  } finally {
    console.log("GET all posts attempt finished.");
  }
});

module.exports = router;