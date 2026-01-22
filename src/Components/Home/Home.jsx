import { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import Footer from "../Footer/Footer";
import Dashboard from "../Dashboard/Dashboard";
import { checkSubscriptionStatus } from "../../api/api";

function Home({ page }) {
  const [scrolled, setScrolled] = useState(false);
  const [target, setTarget] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ✅ GET LOGGED-IN USER
  const user = JSON.parse(localStorage.getItem("user"));

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setScrolled(scrollPercentage >= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ CHECK SUBSCRIPTION FROM BACKEND
  useEffect(() => {
    if (!user) return;

    checkSubscriptionStatus(user.id)
      .then((status) => setIsSubscribed(status))
      .catch(() => setIsSubscribed(false));
  }, [user]);

  return (
    <>
      <NavBar scrolled={scrolled} />

      <Banner />

      {/* ✅ DASHBOARD FIXED */}
      <Dashboard
        user={user}
        isSubscribed={isSubscribed}
      />

      <div className="row-areas">
        {page === "new" ? (
          <>
            <Row title="Trending Now" genres="trending" />
            <Row title="Popular Movies" genres="popular" />
            <Row title="Upcoming Releases" genres="upcoming" />
          </>
        ) : (
          <>
            <Row title="Romance" genres={10749} />
            <Row title="Horror" genres={27} />
            <Row title="Action Movies" genres={28} />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Home;
