const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const fetch = require("node-fetch");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

let favouriteItems = require("./favourites.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// MtrackIddleware
app.use(cors());
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to my App!!!" });
});

// Itunes Search
app.get("/search/:name/:type", (req, res) => {
  // get name parameter from the ui
  const name = req.params.name;
  // get the type from the ui
  const type = req.params.type;
  fetch(`https://itunes.apple.com/search?term=${name}&limit=12&entity=${type}`)
    .then(res => res.json())
    .then(data => res.send(data))
    .catch(err => console.warn(err));
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// establish port/local server
//const PORT = process.env.PORT || 7001;
//app.listen(PORT, () => console.log(`Port is running at ${PORT}`));
