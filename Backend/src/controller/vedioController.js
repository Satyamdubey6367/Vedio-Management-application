const express = require("express");

const Video = require("../model/vedioModel");
const router = express.Router();

const createVideo = async (req, res) => {
  try {
    const { title, description, thumbnail, videoUrl } = req.body;

    const newVideo = await Video.create(req.body);

    console.log(newVideo, "newVideo");

    res.status(201).json({ message: "Video uploaded successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error uploading video.", error: err.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching videos.", error: err.message });
  }
};

const getVideoById = async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  if (video) {
    res.json({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
    });
  } else {
    res.status(404).json({ message: "Video not found" });
  }
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
};
