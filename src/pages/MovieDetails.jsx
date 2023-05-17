import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import YouTube from 'react-youtube';

export function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1bdb1af1aa98a6724bc3854afafaaf5b`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1bdb1af1aa98a6724bc3854afafaaf5b`);
      const data = await response.json();
      if (data.results.length > 0) {
        setTrailer(data.results[0].key);
      }
    };
    fetchTrailer();
  }, [movieId]);

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerdetail">
    <div className="imagtext">
      <div className="firtchild" onClick={() => setShowTrailer(true)}>
        <img className="imgdetail" src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.Title} />
      </div>
      <div className="text">
        <h3 className="titl">{movie.title}</h3>
        <p className="p-realase">{movie.release_date}</p>
        <p className="p-average">Rate {movie.vote_average}</p>
        <p className="p-overview">{movie.overview}</p>
      </div>
    </div>
      <div className="secondchild">
        {showTrailer && trailer && (
          <div className="reproductor">
            <YouTube videoId={trailer} opts={{ width: '1200', height: '800' }}  />
            <button className="close-button" onClick={closeTrailer}>Close Trailer</button>
            
          </div>
        )}
      </div>
    </div>
  
  );
}

