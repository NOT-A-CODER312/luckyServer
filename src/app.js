const express = require("express");

const app = express();
const helemet = require("helmet");

// const userInfoRouter = require("./routes/user/userInfo.router");
const testInfoRouter = require("./routes/test/test.router")
const cors = require("cors");

// app.use(helemet());
app.use(
  cors({
    origin: [
        "*",
    //   "http://localhost:3000",
    //   "https://hello-world-keanu312.vercel.app",
    //   "https://betethereumgames.com",
    //   "https://betethereumgames.com/",
    ],
  })
);
app.use(express.json());
app.use("/test", testInfoRouter);

module.exports = app;