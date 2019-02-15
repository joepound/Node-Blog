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

router.post("/", async (req, res) => {
  console.log("\nAttempting to POST new post...");

  const { text, user_id } = req.body;

  console.log(
    "Checking if text content and associated user ID were supplied..."
  );
  if (!text) {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.POST_POST_NO_TEXT_CONTENT
    });
    console.log("Post POST attempt finished.");
  } else if (!user_id) {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.POST_POST_NO_ASSOCIATED_USER
    });
    console.log("Post POST attempt finished.");
  } else {
    console.log("Checking if associated user ID exists...");
    try {
      const idToCheck = await userDB.getById(user_id);

      if (idToCheck) {
        console.log("Proceeding to create post...");
        try {
          const post = await postDB.insert({ text, user_id });
          res.status(201).json({
            success: true,
            post
          });
        } catch (err) {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            errorInfo: errors.POST_POST_FAILURE
          });
        }
      } else {
        const code = 400;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.POST_POST_NO_ASSOCIATED_USER
        });
      }
    } catch {
      const code = 500;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.POST_POST_USER_ID_CHECK_FAILURE
      });
    } finally {
      console.log("Post POST attempt finished.");
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to DELETE post ID [${id}]...`);

  console.log("Checking if specified post exists...");
  try {
    const post = await postDB.getById(id);

    if (post) {
      console.log("Proceeding to delete post...");
      try {
        const deletionCount = await postDB.remove(id);

        if (deletionCount === 1) {
          res.status(200).json({
            success: true,
            post
          });
        } else {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            errorInfo: deletionCount
              ? errors.DELETE_POST_MULTIPLE_DELETED_ENTRIES
              : errors.DELETE_POST_NO_DELETED_ENTRIES
          });
        }
      } catch (err) {
        const code = 500;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.DELETE_POST_FAILURE
        });
      }
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.DELETE_POST_NOT_FOUND
      });
    }
  } catch (err) {
    const code = 404;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.DELETE_USER_EXISTENCE_CHECK_FAILURE
    });
  } finally {
    console.log(`DELETE attempt for post ID [${id}] finished.`);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to PUT information updates for post ID [${id}]...`);

  const { text } = req.body;

  console.log("Checking if text content was supplied...");
  if (text) {
    console.log("Checking if specified post exists...");
    try {
      const post = await postDB.getById(id);

      if (post) {
        console.log("Proceeding to update post...");
        try {
          const updateCount = await postDB.update(id, { text });

          if (updateCount === 1) {
            res.status(200).json({
              success: true,
              post: {
                ...post,
                text
              }
            });
          } else {
            const code = 500;
            res.status(code).json({
              success: false,
              code,
              errorInfo: updateCount
                ? errors.PUT_POST_MULTIPLE_UPDATED_ENTRIES
                : errors.PUT_POST_NO_UPDATED_ENTRIES
            });
          }
        } catch (err) {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            errorInfo: errors.PUT_POST_FAILURE
          });
        }
      } else {
        const code = 404;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.PUT_POST_NOT_FOUND
        });
      }
    } catch (err) {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.PUT_POST_EXISTENCE_CHECK_FAILURE
      });
    } finally {
      console.log(`PUT attempt for post ID [${id}] finished.`);
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.PUT_POST_NO_TEXT_CONTENT
    });
    console.log(`PUT attempt for post ID [${id}] finished.`);
  }
});

module.exports = router;
