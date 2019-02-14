const express = require("express");
const router = express.Router();

const userDB = require("./dbHelper");
const errors = require("./errors");

router.get("/", async (req, res) => {
  console.log("Attempting to GET all users...")

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
    })
  } finally {
    console.log("GET attempt finished.");
  }
});

module.exports = router;