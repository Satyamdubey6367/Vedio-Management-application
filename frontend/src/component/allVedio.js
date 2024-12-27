import React, { useState, useEffect } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch video data from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(process.env.HOST_URL,"/api/vedios/videos");
        const data = await response.json();
        if (response.ok) {
          setVideos(data);
          setLoading(false);
        } else {
          setError(data.message || "Failed to fetch videos.");
        }
      } catch (err) {
        setError("An error occurred while fetching videos.");
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Playlist</h2>
        {videos.length === 0 ? (
          <p>No videos found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {videos.map((video) => (
              <div
                key={video._id}
                className="video-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                }}
              >
                <a
                  href={`/video/${video._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="thumbnail-container">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="thumbnail"
                      style={{
                        width: "100%",
                        height: "232px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                    />
                  </div>
                  <h4
                    style={{
                      padding: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {video.title}
                  </h4>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>
        {`
          .video-card:hover {
            transform: scale(1.05);
          }

          .thumbnail-container:hover .thumbnail {
            transform: scale(1.1);
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};

export default VideoList;
