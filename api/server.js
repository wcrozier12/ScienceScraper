const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/Scraper";
const PORT = process.env.PORT || 3001;
// Initialize Express
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.text());
app.use(
  bodyParser.json({
    type: "application/vnd.api+json"
  })
);
app.use(express.static(path.join(__dirname, "client/build")));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});
app.use("/api", routes.commentRoutes);
app.use("/api", routes.articleRoutes);

// Listen on port 3001
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
