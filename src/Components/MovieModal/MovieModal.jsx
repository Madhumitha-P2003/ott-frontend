import React, { useEffect, useState } from "react";
import "./MovieModal.css";
import axios from "../../Axios";
import { API_KEY, IMG_BASE } from "../../constants/constant";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import { useMyList } from "../../context/MyListContext";
import { checkSubscriptionStatus } from "../../api/api";

function MovieModal({ movie, onClose }) {
  const [trailer, setTrailer] = useState("");
  const [canPlay, setCanPlay] = useState(false); // 🔥 KEY FIX
  const navigate = useNavigate();
  const { myList, addToMyList, removeFromMyList } = useMyList();

  if (!movie) return null;

  const isAdded = myList.some((m) => m.id === movie.id);

  // Fetch trailer ONLY (do not play yet)
  useEffect(() => {
    setCanPlay(false); // reset on movie change
    axios
      .get(`/movie/${movie.id}/videos?api_key=${API_KEY}`)
      .then((res) => {
        if (res.data.results.length > 0) {
          setTrailer(res.data.results[0].key);
        }
      })
      .catch(() => {});
  }, [movie.id]);

  // ▶ PLAY LOGIC (CORRECT)
  const handlePlay = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    try {
      const isSubscribed = await checkSubscriptionStatus(user.id);

      if (!isSubscribed) {
        navigate("/subscription");
      } else {
        setCanPlay(true); // ✅ NOW trailer plays
      }
    } catch {
      alert("Error checking subscription");
    }
  };

  return (
    <div className="movie-modal-overlay">
      <div className="movie-modal">
        <span className="close-btn" onClick={onClose}>✕</span>

        {/* BANNER */}
        <div
          className="movie-modal-banner"
          style={{
            backgroundImage: movie.backdrop_path
              ? `url(${IMG_BASE}${movie.backdrop_path})`
              : "none",
          }}
        >
          <div className="movie-modal-gradient">
            <div className="movie-modal-content">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>

              <div className="movie-modal-actions">
                <button className="play" onClick={handlePlay}>
                  ▶ Play
                </button>

                <button
                  className="info"
                  onClick={() =>
                    isAdded
                      ? removeFromMyList(movie.id)
                      : addToMyList(movie)
                  }
                >
                  {isAdded ? "✓ Added to My List" : "+ My List"}
                </button>

                <button className="info">👍 Like</button>
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 TRAILER — ONLY AFTER PLAY + SUBSCRIPTION */}
        {canPlay && trailer && (
          <div className="movie-modal-trailer">
            <YouTube
              videoId={trailer}
              opts={{ width: "100%", height: "420" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieModal;
