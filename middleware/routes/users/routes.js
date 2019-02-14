const express = require("express");
const router = express.Router();

const userDB = require("./dbHelper");
const errors = require("./errors");

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to GET user with ID [${id}]...`);
  try {
    const user = await userDB.getById(id);

    if (user) {
      console.log(`\nAttempting to GET posts from user with ID [${id}]...`);

      try {
        const posts = await userDB.getUserPosts(id);
        res.status(200).json({
          success: true,
          posts
        })
      } catch {
        const code = 500;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.getUserPostsFailure
        });
      }
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.getIndividualUserNotFound
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.getIndividualUserFailure
    });
  } finally {
    console.log(`GET attempt for posts by user ID [${id}] finished.`);
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to GET user with ID [${id}]...`);
  try {
    const user = await userDB.getById(id);

    if (user) {
      res.status(200).json({
        success: true,
        user
      });
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.getIndividualUserNotFound
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.getIndividualUserFailure
    });
  } finally {
    console.log(`GET attempt for user ID [${id}] finished.`);
  }
});

router.get("/", async (req, res) => {
  console.log("\nAttempting to GET all users...");
  try {
    const users = await userDB.get();
    res.status(200).json({
      success: true,
      users
    });
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.getAllUsersFailure
    });
  } finally {
    console.log("GET all users attempt finished.");
  }
});

module.exports = router;
