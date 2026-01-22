import NavBar from "../NavBar/NavBar";
import Row from "../Row/Row";
import Footer from "../Footer/Footer";

function TvShows() {
  return (
    <>
      <NavBar />

      <div style={{ paddingTop: "5rem" }}>
        <Row title="Popular TV Shows" genres={10759} />
        <Row title="Drama TV Shows" genres={18} />
      </div>

      <Footer />
    </>
  );
}

export default TvShows;
