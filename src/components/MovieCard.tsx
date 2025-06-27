
import React from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: string;
  rank: number;
  title: string;
  description: string;
  image: string;
  big_image: string;
  genre: string[];
  thumbnail: string;
  rating: string;
  year: number;
  imdbid: string;
  imdb_link: string;
}

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="card bg-secondary border-0 h-100 movie-card">
      <div className="position-relative overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="card-img-top"
          style={{ height: '400px', objectFit: 'cover' }}
          loading="lazy"
        />
        <div className="position-absolute top-0 start-0 m-2">
          <span className="badge bg-primary fs-6">#{movie.rank}</span>
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-warning text-dark fs-6">
            ⭐ {movie.rating}
          </span>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-white fw-bold mb-2">
          {movie.title}
        </h5>
        
        <p className="text-muted mb-2">
          {movie.year} • {movie.genre.slice(0, 2).join(', ')}
        </p>
        
        <p className="card-text text-light opacity-75 flex-grow-1">
          {movie.description.length > 100 
            ? `${movie.description.substring(0, 100)}...` 
            : movie.description}
        </p>
        
        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="btn btn-primary flex-fill"
          >
            View Details
          </Link>
          <a
            href={movie.imdb_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary"
          >
            IMDB
          </a>
        </div>
      </div>
    </div>
  );
};
