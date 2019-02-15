const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    required: true,
    unique: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }]
});

const Articles = mongoose.model("Article", ArticleSchema);

module.exports = Articles;