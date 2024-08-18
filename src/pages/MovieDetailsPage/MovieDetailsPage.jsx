import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ loading, setLoading, error, setError }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const goBackRef = useRef(location?.state ?? '/movies');
  console.log(location);

  useEffect(() => {
    const fetchMovieDetailsData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setGenres(data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetailsData();
  }, [setLoading, setError, movieId]);

  return (
    <main>
      <Link to={goBackRef.current} className={css.btnBack}>
        &lt;&#32;Go back
      </Link>
      {loading && <Loader />}

      {error ? (
        <p className={css.error}>{error}</p>
      ) : (
        <div className={css.movieBlock}>
          <div className={css.mainBlock}>
            <div className={css.poster}>
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie poster"
              />
            </div>
            <div className={css.infoBlock}>
              <h2>
                {movie.title}&nbsp;({String(movie.release_date).split('-', 1)})
              </h2>
              <p>User Score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <ul className={css.list}>
                {genres.map(genre => {
                  return (
                    <li key={genre.id} className={css.item}>
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={css.addBlock}>
            <p className={css.textAddBlock}>Additional information</p>
            <ul className={css.addList}>
              <li className={css.addItem}>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li className={css.addItem}>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetailsPage;
