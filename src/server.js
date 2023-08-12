const http = require("http");
// const io = require("socket.io");

// const mongoose = require("mongoose");
// const MONGO_URI =
//   "mongodb+srv://next-auth:d1880w4qNO2LwIqu@cluster0.lvweu.mongodb.net/users?retryWrites=true&w=majority";

// const cluster = require("cluster");
const app = require("./app");

const expressServer = http.createServer(app);
// const socketServer = io(expressServer, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://hello-world-keanu312.vercel.app",
//       "https://betethereumgames.com",
//     ],
//     methods: ["GET", "POSt"],
//   },
// });

const PORT = process.env.PORT || 3009;

// mongoose.connection.once("open", () => {
//   console.log("MongoDB connection ready!");
// });

// mongoose.connection.on("error", (err) => {
//   console.error(err);
// });





async function startServer() {
//   await mongoose.connect(MONGO_URI);

  expressServer.listen(PORT)
  console.log(`🍀🍀 Listening to PORT: ${PORT} 🍀🍀`);
}

startServer();