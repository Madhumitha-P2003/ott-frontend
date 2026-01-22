import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register";
import Subscription from "./Components/Subscription/Subscription";

import Home from "./Components/Home/Home";
import TvShows from "./Components/TvShows/TvShows";
import Movies from "./Components/Movies/Movies";
import NewPopular from "./Components/NewPopular/NewPopular";
import MyList from "./Components/MyList/MyList";
import Languages from "./Components/Languages/Languages";

import "./App.css";

function App() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Pages */}
        <Route path="/home" element={<Home subscribed={subscribed} />} />
        <Route path="/tv" element={<TvShows subscribed={subscribed} />} />
        <Route path="/movies" element={<Movies subscribed={subscribed} />} />
        <Route path="/new" element={<NewPopular subscribed={subscribed} />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/languages" element={<Languages />} />

        {/* Subscription */}
        <Route
          path="/subscription"
          element={<Subscription setSubscribed={setSubscribed} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
