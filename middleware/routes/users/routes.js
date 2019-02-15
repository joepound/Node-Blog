const express = require("express");
const router = express.Router();

const userDB = require("./dbHelper");
const postDB = require("../posts/dbHelper");
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
      } catch (err) {
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
          errorInfo: errors.POST_USER_NAME_IN_USE
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
        errorInfo: errors.POST_USER_DUPLICATE_NAMES_CHECK_FAILURE
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(`\nAttempting to DELETE user ID [${id}]...`);

  console.log("Checking if specified user exists...");
  try {
    const user = await userDB.getById(id);

    if (user) {
      console.log("Retrieving posts information...");
      try {
        const posts = await postDB.get();

        console.log(`Identifying posts belonging to user ID [${id}]...`);
        const userPosts = [];
        const postsAssociationError = false;
        for (let i = 0; i < posts.length; i++) {
          if (postsAssociationError) {
            break;
          }
          try {
            const postToCheck = await postDB.getById(posts[i].id);

            if (postToCheck.user_id === user.id) {
              userPosts.push(postToCheck.id);
            }
          } catch (err) {
            postsAssociationError = true;
            const code = 500;
            res.status(code).json({
              success: false,
              code,
              errorInfo: errors.DELETE_USER_POSTS_ASSOCIATION_FAILURE
            });
          }
        }

        if (!postsAssociationError) {
          const postsDeletionError = false;
          if (userPosts.length) {
            console.log(`Deleting posts by user ID [${id}]...`);
            for (let i = 0; i < userPosts.length; i++) {
              if (postsDeletionError) {
                break;
              }
              try {
                const postDeletionCount = await postDB.remove(userPosts[i]);

                if (postDeletionCount !== 1) {
                  postsDeletionError = true;
                  const code = 500;
                  res.status(code).json({
                    success: false,
                    code,
                    errorInfo: postsDeletionError
                      ? errors.DELETE_USER_UNEXPECTED_POST_DELETION
                      : errors.DELETE_USER_POST_DELETION_FAILURE
                  });
                }
              } catch (err) {
                postsDeletionError = true;
                const code = 500;
                res.status(code).json({
                  success: false,
                  code,
                  errorInfo: errors.DELETE_USER_POST_DELETION_FAILURE
                });
              }
            }
          }

          if (!postsDeletionError) {
            console.log(`Proceeding to delete user ID [${id}]...`);
            try {
              const userDeletionCount = await userDB.remove(id);

              if (userDeletionCount === 1) {
                res.status(200).json({
                  success: true,
                  user
                });
              } else {
                const code = 500;
                res.status(code).json({
                  success: false,
                  code,
                  errorInfo: userDeletionCount
                    ? errors.DELETE_USER_MULTIPLE_DELETED_ENTRIES
                    : errors.DELETE_USER_NO_DELETED_ENTRIES
                });
              }
            } catch (err) {
              const code = 500;
              res.status(code).json({
                success: false,
                code,
                errorInfo: errors.DELETE_USER_FAILURE
              });
            }
          }
        }
      } catch (err) {
        const code = 500;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.DELETE_USER_POSTS_RETRIEVAL_FAILURE
        });
      }
    } else {
      const code = 404;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.DELETE_USER_NOT_FOUND
      });
    }
  } catch (err) {
    const code = 500;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.DELETE_USER_EXISTENCE_CHECK_FAILURE
    });
  } finally {
    console.log(`DELETE attempt for user ID [${id}] finished.`);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log(`\nAttempting to PUT information updates for user ID [${id}]...`);

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
              errorInfo: errors.PUT_USER_NAME_IN_USE
            });
          } else {
            console.log("Proceeding to update user...");
            try {
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
                  errorInfo:
                    updateCount > 1
                      ? errors.PUT_USER_MULTIPLE_UPDATED_ENTRIES
                      : errors.PUT_USER_NO_UPDATED_ENTRIES
                });
              }
            } catch (err) {
              const code = 500;
              res.status(code).json({
                success: false,
                code,
                errorInfo: errors.PUT_USER_FAILURE
              });
            }
          }
        } catch (err) {
          const code = 500;
          res.status(code).json({
            success: false,
            code,
            errorInfo: errors.PUT_USER_DUPLICATE_NAMES_CHECK_FAILURE
          });
        }
      } else {
        const code = 404;
        res.status(code).json({
          success: false,
          code,
          errorInfo: errors.PUT_USER_NOT_FOUND
        });
      }
    } catch (err) {
      const code = 500;
      res.status(code).json({
        success: false,
        code,
        errorInfo: errors.PUT_USER_EXISTENCE_CHECK_FAILURE
      });
    } finally {
      console.log(`PUT attempt for user ID [${id}] finished.`);
    }
  } else {
    const code = 400;
    res.status(code).json({
      success: false,
      code,
      errorInfo: errors.PUT_USER_NO_NAME
    });
    console.log(`PUT attempt for user ID [${id}] finished.`);
  }
});

module.exports = router;
