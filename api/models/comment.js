var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});
var Comment = mongoose.model("Comments", CommentSchema);
module.exports = Comment;
