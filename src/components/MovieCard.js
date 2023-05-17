import "./MovieCard.css";
import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  return (
    <li className="gridfilms">
      <Link to={"/movie/" + movie.id}>
        <img className="images" src={imageUrl} alt={movie.title} />
        <div className="tittlemovies">{movie.title}</div>
      </Link>
    </li>
  );
}

