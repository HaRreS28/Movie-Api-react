import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect, createContext } from "react";
import Layout from "./components/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";
import Footer from "./components/footer/Footer";
import WatchList from "./components/watchlist/WatchList";
import Login from "./components/login/Login";

function App() {
  const [movies, setMovies] = useState([]);
  const movieContext = createContext();
  const navigate = useNavigate();
  const [position, setPosition] = useState("");

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovies();
    setPosition(window.location.pathname);
  }, []);

  return (
    <movieContext.Provider value={movies}>
      <div>
        {(() => {
          if (position === "/login") {
            return <Login isRegister={false} />;
          } else if (position === "/register") {
            return <Login isRegister={true} />;
          } else {
            return (
              <div className="App" id="app">
                <Header />
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home movies={movies} />} />
                    <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
                    <Route path="/Reviews/:movieId" element={<Reviews />} />
                    <Route
                      path="/watchlist"
                      element={<WatchList movieContext={movieContext} />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
                <Footer />
              </div>
            );
          }
        })()}
      </div>
    </movieContext.Provider>
  );
}

export default App;
