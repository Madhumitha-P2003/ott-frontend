import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../Axios";
import { API_KEY, IMG_BASE } from "../../constants
/constant";
import YouTube from "react-youtube";
import MovieModal from "../MovieModal/MovieModal";
import { addToMyList } from "../../api/api";

function Row({
  genres,
  title,
  setTarget = () => {},   // ✅ safe default
  target = {},            // ✅ safe default
  subscribed = false,
}) {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  /* ================= TRAILER HOVER ================= */
  const manageTarget = async (id, status) => {
    if (!subscribed) return;
    if (typeof setTarget !== "function") return;

    setTarget({ index: id, status });

    try {
      const res = await axios.get(
        `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );

      if (res.data?.results?.length > 0) {
        setTrailer(res.data.results[0].key);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= TMDB FETCH ================= */
  useEffect(() => {
    let url = "";

    if (genres === "trending") {
      url = `trending/movie/week?api_key=${API_KEY}`;
    } else if (genres === "popular") {
      url = `movie/popular?api_key=${API_KEY}`;
    } else if (genres === "upcoming") {
      url = `movie/upcoming?api_key=${API_KEY}`;
    } else {
      url = `discover/movie?api_key=${API_KEY}&with_genres=${genres}`;
    }

    axios.get(url).then((res) => {
      setMovies(res.data?.results || []);
    });
  }, [genres]);

  /* ================= ADD TO MY LIST (JWT BASED) ================= */
  const handleAddToMyList = async (movie, e) => {
    e.stopPropagation(); // ❗ very important

    try {
      await addToMyList(movie.id);
      alert(`${movie.title} added to My List`);
    } catch (err) {
      console.error(err);
      alert("Already added or error occurred");
    }
  };

  return (
    <>
      <div className="row pt-5">
        <h4>{title}</h4>

        <div className="posters">
          {movies.map((item) => (
            <div
              key={item.id}
              className="poster-div"
              style={{
                backgroundImage: item.poster_path
                  ? `url(${IMG_BASE}${item.poster_path})`
                  : "none",
              }}
              onMouseEnter={() => manageTarget(item.id, true)}
              onMouseLeave={() =>
                typeof setTarget === "function" &&
                setTarget({ index: null, status: false })
              }
              onClick={() => setSelectedMovie(item)}
            >
              {subscribed &&
              target?.index === item.id &&
              target?.status &&
              trailer ? (
                <div className="trailer-container">
                  <YouTube videoId={trailer} opts={opts} />
                </div>
              ) : (
                <div className="poster-overlay">
                  <h6>{item.title}</h6>

                  {/* ADD TO MY LIST */}
                  <button
                    className="mylist-btn"
                    onClick={(e) => handleAddToMyList(item, e)}
                  >
                    + My List
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOVIE DETAIL MODAL */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          subscribed={subscribed}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default Row;
