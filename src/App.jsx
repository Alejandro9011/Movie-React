
import './App.css';
import { BrowserRouter as Router,Routes, Route, Link, } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { Landingpage, } from "./pages/Landingpage";

export function App() {

  return ( 
    <Router>
       <header >
        <Link to="/"><h1 className="titulo">Movies</h1></Link>
        <Link to="/"></Link>
        <Link to="/>movie:Detail"></Link>
      </header>
      <main>
          <Routes>
            <Route path="/movie/:movieId"element={<MovieDetails />} />
            <Route path="/"element={<Landingpage/>} />
        </Routes>
      </main>
    </Router>
  );
}


