import React from 'react';
import { useParams, Link } from 'react-router-dom';

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

// Mock data - in a real app, this would come from props or context
const mockMovies: Movie[] = [
  {
    id: "top1",
    rank: 1,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image: "https://images.unsplash.com/photo-1489599160071-7a4f69eb5056?w=400&h=600&fit=crop",
    big_image: "https://images.unsplash.com/photo-1489599160071-7a4f69eb5056?w=800&h=1200&fit=crop",
    genre: ["Drama"],
    thumbnail: "https://images.unsplash.com/photo-1489599160071-7a4f69eb5056?w=200&h=300&fit=crop",
    rating: "9.3",
    year: 1994,
    imdbid: "tt0111161",
    imdb_link: "https://www.imdb.com/title/tt0111161/"
  },
  {
    id: "top2",
    rank: 2,
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    big_image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop",
    genre: ["Crime", "Drama"],
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=200&h=300&fit=crop",
    rating: "9.2",
    year: 1972,
    imdbid: "tt0068646",
    imdb_link: "https://www.imdb.com/title/tt0068646/"
  },
  {
    id: "top3",
    rank: 3,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    big_image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop",
    genre: ["Action", "Crime", "Drama"],
    thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=200&h=300&fit=crop",
    rating: "9.0",
    year: 2008,
    imdbid: "tt0468569",
    imdb_link: "https://www.imdb.com/title/tt0468569/"
  }
];

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movie = mockMovies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1>Movie Not Found</h1>
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
