import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchFoundMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { FaSistrix } from 'react-icons/fa';
import css from './MoviesPage.module.css';

const notify = () => toast.error('Please, fill your keyword for searching...');

const MoviesPage = ({ loading, setLoading, error, setError }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    setSearchValue('');
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchFoundMovies(query);
        setSearchMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [setLoading, setError, query]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!searchValue) {
      notify();
      return;
    }

    setSearchParams({ query: searchValue });
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className={css.form}>
        <FaSistrix className={css.icon} />
        <input
          className={css.input}
          value={searchValue}
          placeholder="Find movie"
          type="text"
          onChange={e => setSearchValue(e.target.value)}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
        {!searchValue && <Toaster />}
      </form>
      {loading && <Loader />}
      {error ? (
        <p className={css.error}>{error}</p>
      ) : (
        <MovieList movies={searchMovies} />
      )}
    </main>
  );
};

export default MoviesPage;
