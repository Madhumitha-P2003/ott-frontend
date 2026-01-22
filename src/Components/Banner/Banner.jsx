import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";
import { API_KEY, IMG_BASE } from "../../constants
/constant";
import YouTube from "react-youtube";
import "./Banner.css";

function Banner({ scrolled }) {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => {
        const random =
          res.data.results[
            Math.floor(Math.random() * res.data.results.length)
          ];
        setMovie(random);
      });
  }, []);

  useEffect(() => {
    if (!movie) return;
    axios
      .get(`/movie/${movie.id}/videos?api_key=${API_KEY}`)
      .then((res) => {
        if (res.data.results.length > 0) {
          setTrailer(res.data.results[0].key);
        }
      });
  }, [movie]);

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      loop: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
    },
  };

  return (
    <header className="banner">
      {trailer && (
        <div className="banner-video">
          <YouTube videoId={trailer} opts={opts} />
        </div>
      )}

      <div className="banner-fade"></div>

      <div className="banner-content">
        <h1 className="movie-titile">
          {movie?.title || movie?.name}
        </h1>

        <p className="movie-discription">
          {movie?.overview}
        </p>

        <div className="btns">
          <button
            className="playBtn"
            onClick={() => navigate("/subscription")}
          >
            ▶ Play
          </button>

          <button
            className="infoBtn"
            onClick={() => navigate("/subscription")}
          >
            ⓘ More Info
          </button>
        </div>
      </div>
    </header>
  );
}

export default Banner;
