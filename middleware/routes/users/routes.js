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
      console.log(
        `User found; attempting to GET posts from user with ID [${id}]...`
      );

      try {
        const posts = await userDB.getUserPosts(id);
        res.status(200).json({
          success: true,
          posts
        });
      } catch {
        const code = 500;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.GET_USER_POSTS_FAILURE
        });
      }
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.GET_INDIVIDUAL_USER_NOT_FOUND
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.GET_INDIVIDUAL_USER_FAILURE
    });
  } finally {
    console.log(`GET attempt for posts by user ID [${id}] finished.`);
  }
});

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
        errorInfo: errors.GET_INDIVIDUAL_USER_NOT_FOUND
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.GET_INDIVIDUAL_USER_FAILURE
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
      errorInfo: errors.GET_ALL_USERS_FAILURE
    });
  } finally {
    console.log("GET all users attempt finished.");
  }
});

router.post("/", async (req, res) => {
  console.log("\nAttempting to POST new user...");

  const { name } = req.body;

  console.log("Checking if name was supplied...");
  if (name) {
    console.log("Checking if supplied name is unique...");
    try {
      const users = await userDB.get();

      const nameInUse = users.some(user => user.name === name);
      if (nameInUse) {
        const code = 400;
        res.status(code).json({
          success: false,
          code,
          error: errors.POST_USER_NAME_IN_USE
        });
      } else {
        try {
          const user = await userDB.insert({ name });
          res.status(201).json({
            success: true,
            user
          });
        } catch (err) {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            errorInfo: errors.POST_USER_FAILURE
          });
        }
      }
    } catch (err) {
      const code = 500;
      res.status(code).json({
        success: false,
        code,
        error: errors.POST_USER_DUPLICATE_NAMES_CHECK_FAILURE
      });
    } finally {
      console.log("User POST attempt finished.");
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.POST_USER_NO_NAME
    });
    console.log("User POST attempt finished.");
  }
});

router.put("/:id", async (req, res) => {
  console.log("\nAttempting to PUT user information updates...");

  const { id } = req.params;
  const { name } = req.body;

  console.log("Checking if name was supplied...");
  if (name) {
    console.log("Checking if specified user exists...");
    try {
      const user = await userDB.getById(id);

      if (user) {
        console.log("Checking if supplied name is unique...");
        try {
          const users = await userDB.get();

          const nameInUse = users.some(user => user.name === name);
          if (nameInUse) {
            const code = 400;
            res.status(code).json({
              success: false,
              code,
              error: errors.PUT_USER_NAME_IN_USE
            });
          } else {
            const updateCount = await userDB.update(id, { name });

            if (updateCount === 1) {
              res.status(200).json({
                success: true,
                user
              });
            } else {
              const code = 500;
              res.status(code).json({
                success: false,
                code,
                error:
                  updateCount > 1
                    ? errors.PUT_USER_MULTIPLE_UPDATED_ENTRIES
                    : errors.PUT_USER_NO_UPDATED_ENTRIES
              });
            }
          }
        } catch (err) {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            error: errors.PUT_USER_DUPLICATE_NAMES_CHECK_FAILURE
          });
        }
      } else {
        const code = 404;
        res.status(code).json({
          success: false,
          code,
          error: errors.PUT_USER_NOT_FOUND
        });
      }
    } catch {
      const code = 500;
      res.status(code).json({
        success: false,
        code,
        error: errors.PUT_USER_EXISTENCE_CHECK_FAILURE
      });
    } finally {
      console.log("User PUT attempt finished.");
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.PUT_USER_NO_NAME
    });
    console.log("User PUT attempt finished.");
  }
});

module.exports = router;
