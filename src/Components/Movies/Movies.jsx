import NavBar from "../NavBar/NavBar";
import Row from "../Row/Row";
import Footer from "../Footer/Footer";

function Movies() {
  return (
    <>
      <NavBar />

      <div style={{ paddingTop: "5rem" }}>
        <Row title="Popular Movies" genres={28} />
        <Row title="Comedy Movies" genres={35} />
      </div>

      <Footer />
    </>
  );
}

export default Movies;
