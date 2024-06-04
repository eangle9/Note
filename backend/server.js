const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const ConnectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
// const User = require("./models/userModel");

const app = express();
dotenv.config();
ConnectDb();
app.use(express.json());
app.use(
  cors({
    origin: ["https://note-zipper-three.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.get("/users", async(req, res) => {
//   const users = await User.find();
//   res.json(users);
// });
app.get("/", (req, res) => {
  res.send("Api is running...");
});

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server is running on port ${PORT}`));
