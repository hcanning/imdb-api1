
import React, { useState, useEffect } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface Movie {
  id: number;
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

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please check your API key.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="text-danger mb-3">Error</h2>
          <p className="mb-4">{error}</p>
          <button className="btn btn-primary" onClick={fetchMovies}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="bg-primary py-4 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-0 fw-bold">🎬 IMDB Top 100 Movies</h1>
              <p className="mb-0 opacity-75">Discover the greatest films of all time</p>
            </div>
            <div className="col-auto">
              <span className="badge bg-secondary fs-6">
                {movies.length} Movies
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Movies Grid */}
        <div className="row g-4 mb-5">
          {currentMovies.map((movie) => (
            <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0 opacity-75">
            Data provided by IMDB Top 100 Movies API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
