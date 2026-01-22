import NavBar from "../NavBar/NavBar";
import Row from "../Row/Row";
import Footer from "../Footer/Footer";

function Languages() {
  return (
    <>
      <NavBar />
      <Row title="Indian Movies" genres={10402} />
      <Footer />
    </>
  );
}

export default Languages;
