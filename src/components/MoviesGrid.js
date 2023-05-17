import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesGrid.css";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";

export function MoviesGrid() {
  const [searchKey, setSearchKey] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=1bdb1af1aa98a6724bc3854afafaaf5b&page=${page}`
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    };
    fetchMovies();
  }, [page, location]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="cartsfilms">
      {filteredMovies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <MovieCard movie={movie} />
        </Link>
      ))}
      <div ref={loaderRef}>Loading...</div>
    </div>
  );
}
