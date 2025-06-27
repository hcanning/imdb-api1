
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MovieContext } from '../App';

const MovieDetail = () => {
  const { id } = useParams();
  const { movies } = useContext(MovieContext);
  
  const movie = movies.find(m => m.id === id);

  console.log('MovieDetail - Looking for movie with id:', id);
  console.log('MovieDetail - Available movies:', movies.map(m => ({ id: m.id, title: m.title })));
  console.log('MovieDetail - Found movie:', movie);

  if (!movie) {
    return (
      <div className="min-h-screen bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1>Movie Not Found</h1>
          <p>Could not find movie with ID: {id}</p>
          <Link to="/" className="btn btn-primary mt-3">Back to Movies</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white position-relative">
      {/* Background Image */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${movie.big_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Content */}
      <div className="position-relative" style={{ zIndex: 2 }}>
        {/* Navigation */}
        <nav className="navbar navbar-dark bg-transparent py-3">
          <div className="container">
            <Link to="/" className="btn btn-outline-light">
              ← Back to Movies
            </Link>
          </div>
        </nav>

        {/* Movie Details */}
        <div className="container py-5">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <img
                src={movie.image}
                alt={movie.title}
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '600px', width: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <div className="col-lg-8">
              <div className="ps-lg-5">
                <div className="mb-3">
                  <span className="badge bg-primary fs-6 me-2">#{movie.rank}</span>
                  <span className="badge bg-warning text-dark fs-6">
                    ⭐ {movie.rating}
                  </span>
                </div>
                
                <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
                
                <p className="fs-5 text-light mb-4">
                  {movie.year} • {movie.genre.join(', ')}
                </p>
                
                <p className="fs-6 text-light mb-4 lh-lg">
                  {movie.description}
                </p>
                
                <div className="d-flex flex-wrap gap-3">
                  <a
                    href={movie.imdb_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    View on IMDB
                  </a>
                  
                  <Link to="/" className="btn btn-outline-light btn-lg">
                    Browse More Movies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
