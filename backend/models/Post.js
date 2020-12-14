const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  author: {
    type: schema.Types.ObjectId,
    ref: "User",
    require:true,
  },
  comments: [
    {
      user: { type: schema.ObjectId, ref: "User" },
      content: { type: String, required: true },
      timeCreated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  reacts: {
    likes: [{ user: { type: schema.ObjectId, ref: "User" } }],
    shares: [{ user: { type: schema.ObjectId, ref: "User" } }],
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
