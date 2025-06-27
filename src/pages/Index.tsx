import React, { useState, useEffect } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Movie } from '../types/Movie';

// Mock data to demonstrate the app functionality - now using string IDs
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

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usingMockData, setUsingMockData] = useState(false);
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
      setUsingMockData(false);
    } catch (err) {
      console.error('Error fetching movies:', err);
      
      // Use mock data as fallback
      console.log('Using mock data as fallback...');
      setMovies(mockMovies);
      setUsingMockData(true);
      setError(err instanceof Error ? err.message : 'Failed to load movies from API, showing sample data instead.');
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

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="bg-primary py-4 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h2 mb-0 fw-bold">🎬 IMDB Top 100 Movies</h1>
              <p className="mb-0 opacity-75">
                {usingMockData ? 'Sample data (API issue)' : 'Discover the greatest films of all time'}
              </p>
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
        {error && (
          <div className="alert alert-warning mb-4" role="alert">
            <h5 className="alert-heading">API Issue Detected</h5>
            <p className="mb-2">{error}</p>
            <hr />
            <p className="mb-0">
              <strong>To fix this:</strong>
              <br />
              1. Check that your RapidAPI key is subscribed to the "IMDB Top 100 Movies" API
              <br />
              2. Verify your API key hasn't exceeded rate limits
              <br />
              3. Visit <a href="https://rapidapi.com/rapihub-rapihub-default/api/imdb-top-100-movies" target="_blank" rel="noopener noreferrer" className="alert-link">RapidAPI IMDB Top 100 Movies</a> to manage your subscription
            </p>
            <button className="btn btn-warning mt-2" onClick={fetchMovies}>
              Try API Again
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
            {usingMockData ? 'Sample data - API connection needed' : 'Data provided by IMDB Top 100 Movies API'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
