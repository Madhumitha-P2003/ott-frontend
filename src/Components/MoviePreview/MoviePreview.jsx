import "./MoviePreview.css";

function MoviePreview({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="preview-backdrop" onClick={onClose}>
      <div
        className="preview-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="preview-content">
          <h2>{movie.title || movie.name}</h2>

          <div className="preview-meta">
            <span className="match">45% match</span>
            <span className="age">U/A 16+</span>
            <span className="season">1 Season</span>
            <span className="hd">HD</span>
          </div>

          <div className="preview-actions">
            <button className="play">▶ Play</button>
            <button>＋</button>
            <button>👍</button>
          </div>

          <p className="preview-desc">
            {movie.overview}
          </p>
        </div>

        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default MoviePreview;
