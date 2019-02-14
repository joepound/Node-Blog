const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");



const userRoutes = require("./routes/users/routes");
const postRoutes = require("./routes/posts/routes");


const server = express();


module.exports = server;