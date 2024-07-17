const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 5000;
mongoose
  .connect("mongodb://127.0.0.1:27017/articleUser")
  .then(() => {
    console.log("MONGO OPEN!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR");
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/article"));
app.use("/api/like", require("./routes/likeArticle"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("App listing at port ", port);
});
