import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = ({ loading, setLoading, error, setError }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMoviesData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMoviesData();
  }, [setLoading, setError]);

  return (
    <main>
      <h1 className={css.title}>Trending today</h1>
      {loading && <Loader />}
      {error ? (
        <p className={css.error}>{error}</p>
      ) : (
        <MovieList movies={trendingMovies} />
      )}
    </main>
  );
};

export default HomePage;
