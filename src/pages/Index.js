
import React, { useState, useEffect, useContext } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MovieContext } from '../App';

const Index = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch movies from API...');
      
      const response = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c840b10966msh0cb78fc662b7140p148a74jsn493910a799ac',
          'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('API Error response:', errorData);
        
        if (response.status === 403) {
          throw new Error(`API Access Error (403): ${errorData.message || 'You are not subscribed to this API'}`);
        } else if (response.status === 429) {
          throw new Error(`Rate Limit Error (429): ${errorData.message || 'Too many requests'}`);
        } else {
          throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to fetch movies'}`);
        }
      }

      const data = await response.json();
      console.log('Successfully fetched movies:', data.length);
      setMovies(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(err instanceof Error ? err.message : 'Failed to load movies from API');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && movies.length === 0) {
    return (
      <div className="min-h-screen bg-dark text-white d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <div className="alert alert-danger">
            <h2 className="mb-3">Unable to Load Movies</h2>
            <p className="mb-3">{error}</p>
            <p className="mb-3">
              <strong>To fix this:</strong>
              <br />
              1. Check that your RapidAPI key is subscribed to the "IMDB Top 100 Movies" API
              <br />
              2. Verify your API key hasn't exceeded rate limits
              <br />
              3. Visit <a href="https://rapidapi.com/rapihub-rapihub-default/api/imdb-top-100-movies" target="_blank" rel="noopener noreferrer" className="alert-link">RapidAPI IMDB Top 100 Movies</a> to manage your subscription
            </p>
            <button className="btn btn-primary" onClick={fetchMovies}>
              Try Again
            </button>
          </div>
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
        {/* Error Alert */}
        {error && movies.length > 0 && (
          <div className="alert alert-warning mb-4" role="alert">
            <h5 className="alert-heading">API Issue Detected</h5>
            <p className="mb-2">{error}</p>
            <button className="btn btn-warning" onClick={fetchMovies}>
              Refresh Data
            </button>
          </div>
        )}

        {/* Movies Grid */}
        <div className="row g-4 mb-5">
          {currentMovies.map((movie) => (
            <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0 opacity-75">Data provided by IMDB Top 100 Movies API</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
