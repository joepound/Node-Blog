const express = require("express");
const router = express.Router();

const userDB = require("../users/dbHelper");
const postDB = require("./dbHelper");

const errors = require("./error");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to GET post with ID [${id}]...`);
  try {
    const post = await postDB.getById(id);

    console.log("Checking if specified post exists...");
    if (post) {
      res.status(200).json({
        success: true,
        post
      });
    } else {
      const code = 404;
      res.status(code).json({
        success: true,
        code,
        errorInfo: errors.GET_INDIVIDUAL_POST_NOT_FOUND
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.GET_INDIVIDUAL_POST_FAILURE
    });
  } finally {
    console.log(`GET attempt for post ID [${id}] finished.`);
  }
});

router.get("/", async (req, res) => {
  console.log("\nAttempting to GET all posts...");
  try {
    const posts = await postDB.get();
    res.status(200).json({
      success: true,
      posts
    });
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.GET_ALL_POSTS_FAILURE
    });
  } finally {
    console.log("GET all posts attempt finished.");
  }
});

module.exports = router;
