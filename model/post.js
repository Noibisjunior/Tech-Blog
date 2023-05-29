const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    summary: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    articleImage: {
      type: String,
      require:true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categories: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', PostSchema);
