import NavBar from "../NavBar/NavBar";
import { useMyList } from "../../context/MyListContext";
import { IMG_BASE } from "../../Constant/constant";

function MyList() {
  const { myList, removeFromMyList } = useMyList();

  return (
    <>
      <NavBar />

      <div style={{ padding: "120px 40px", color: "white" }}>
        <h2>My List</h2>

        {myList.length === 0 ? (
          <p>Your list is empty</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {myList.map((movie) => (
              <div
                key={movie.id}
                style={{
                  height: "140px",
                  backgroundImage: movie.backdrop_path
                    ? `url(${IMG_BASE}${movie.backdrop_path})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "6px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.2))",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "10px",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{movie.title}</h4>
                  <button
                    onClick={() => removeFromMyList(movie.id)}
                    style={{
                      marginTop: "6px",
                      background: "rgba(109,109,110,0.7)",
                      color: "white",
                      border: "none",
                      padding: "6px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyList;
