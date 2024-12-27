const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const vedioModel = mongoose.model("Video", VideoSchema);
module.exports = vedioModel;
