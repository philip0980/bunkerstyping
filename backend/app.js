const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 8000 ;

// Database
const database = process.env.DATABASE;
mongoose
  .connect(database)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Creating middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({ origin: "*", methods: "POST", credentials: true })
);

// Creating schema
const newSchema = mongoose.model("User", {
  name: { type: String },
  score: { type: Number },
});

// Creating new User
app.post("/", (req, res) => {
  const { name, score } = req.body;
  const User = new newSchema({ name, score });
  User.save()
    .then(() => {
      console.log("Data collected");
      res.send("Data collected"); // Send a response back
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error"); // Send an error response
    });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
