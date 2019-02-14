/* Server imports */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const uppercaseNames = require("./middleware/custom/uppercaseNames");

const userRoutes = require("./middleware/routes/users/routes");
const postRoutes = require("./middleware/routes/posts/routes");
const rootRoute = require("./middleware/routes/root");

const errorHandler = require("./middleware/errorHandler");

// server setup
const server = express();

// built-in middleware
server.use(express.json());

// third party middleware
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// custom middleware (general)
server.use(uppercaseNames);

// custom routing middleware
// server.use("/api/users/", userRoutes);
// server.use("/api/posts", postRoutes);
server.use("/", rootRoute);

// custom error-handling middleware
server.use(errorHandler);

module.exports = server;
