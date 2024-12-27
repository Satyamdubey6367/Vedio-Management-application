import React, { useState, useEffect } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
  });
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  const getURL = async (file, type) => {
    try {
      setLoader(true);
      let fileData = new FormData();
      fileData.append("file", file);
      fileData.append("cloud_name", "djoq2vdms");
      fileData.append("upload_preset", "ml_default");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djoq2vdms/auto/upload",
        fileData
      );

      if (response.data.url) {
        if (type === "thumbnail") {
          setData((prev) => ({ ...prev, thumbnail: response.data.url }));
        } else if (type === "video") {
          setData((prev) => ({ ...prev, videoUrl: response.data.url }));
        }
      }

      setLoader(false);
      setSelectedThumbnail("");
      setSelectedVideo("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedThumbnail) {
      getURL(selectedThumbnail, "thumbnail");
    }
  }, [selectedThumbnail]);

  useEffect(() => {
    if (selectedVideo) {
      getURL(selectedVideo, "video");
    }
  }, [selectedVideo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const response = await axios.post(
        "http://localhost:4000/api/vedios/upload",
        data
      );

      if (response.status === 201) {
        setMessage("Video uploaded successfully!");
        setData({ title: "", description: "", thumbnail: "", video: "" });
        setSelectedThumbnail(null);
        setSelectedVideo(null);
        setLoader(false);
        navigate("/videoslist"); // Navigate to videos list page
      } else {
        setMessage("Error uploading video.");
        setLoader(false);
      }
    } catch (error) {
      setMessage("An error occurred while uploading.");
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#8325da",
        marginTop: "175px",
      }}
    >
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "20px", color: "white" }}>
            <b> Title:</b>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              maxLength="50"
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0",
                height: "30px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "20px", color: "white" }}>
            <b> Description:</b>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              maxLength="200"
              required
              style={{
                display: "block",
                width: "100%",
                margin: "5px 0",
                height: "100px",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "20px", color: "white" }}>
            <b> Thumbnail (JPG, PNG):</b>
            <input
              type="file"
              name="thumbnail"
              accept="image/jpg, image/png"
              onChange={(e) => setSelectedThumbnail(e.target.files[0])}
              required
              style={{ display: "block", margin: "5px 0" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontSize: "20px", color: "white" }}>
            <b> Video:</b>
            <input
              type="file"
              name="video"
              accept="video/mp4, video/MPG, video/AVI"
              onChange={(e) => setSelectedVideo(e.target.files[0])}
              required
              style={{ display: "block", margin: "5px 0" }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loader}
          style={{
            padding: "10px 20px",
            backgroundColor: loader ? "gray" : "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loader ? "not-allowed" : "pointer",
          }}
        >
          {loader ? "Uploading..." : "Upload"}
        </button>
      </form>
      {loader && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Circles height={50} width={50} color="#007BFF" />
        </div>
      )}
      {message && <p style={{ marginTop: "20px", color: "red" }}>{message}</p>}
    </div>
  );
};

export default UploadForm;
