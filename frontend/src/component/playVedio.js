import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; 

const VideoPlayer = () => {
  const { videoId } = useParams(); 
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef(null);

  // Fetch video by ID
  useEffect(() => {
    const fetchVideoById = async () => {
      try {
        const response = await fetch(
          process.env.HOST_URL,`/api/vedios/video/${videoId}`
        );
        const data = await response.json();
        if (response.ok) {
          setVideo(data);
          
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch video.");
        }
      } catch (err) {
        setError("An error occurred while fetching the video.");
      }
    };

    fetchVideoById();
  }, [videoId]);
  
    const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (e) => {
    const volumeLevel = e.target.value;
    setVolume(volumeLevel);
    videoRef.current.volume = volumeLevel;
  };

  const enterFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  if (loading) return <p>Loading video...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginBottom: "10px", textAlign: "center" }}>{video.title}</h2>
      <video
        ref={videoRef}
        autoPlay 
        loop
        style={{ width: "100%", height: "593px", borderRadius: "8px" }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controls
      > <source src={video.videoUrl} type="video/mp4" />
</video>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          gap: "10px",
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={toggleMute}
          style={{
            padding: "10px 20px",
            backgroundColor: isMuted ? "red" : "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          style={{ width: "150px" }}
        />
        <button
          onClick={enterFullScreen}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Fullscreen
        </button>
      </div>
      {video.description && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "16px",
            color: "#333",
          }}
        >
          <strong></strong> {video.description}
        </p>
      )}
    </div>
  );
};

export default VideoPlayer;
