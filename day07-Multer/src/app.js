const express = require("express");
const app = express();
const fileRoutes = require("./routes/file.routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Done!");
});

app.use("/file", fileRoutes);

module.exports = app ; 