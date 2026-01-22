import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import MovieModal from "../MovieModal/MovieModal";
import axios from "../../Axios";
import { API_KEY, IMG_BASE } from "../../Constant/constant";
import "./NewPopular.css";

function NewPopular({ subscribed }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => setMovies(res.data.results));
  }, []);

  return (
    <>
      <NavBar />

      <div className="newpopular-container">
        <h2>🔥 New & Popular</h2>

        <div className="newpopular-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="newpopular-card"
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMG_BASE}${movie.poster_path}`
                    : ""
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

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

export default NewPopular;
