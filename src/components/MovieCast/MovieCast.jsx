import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/api';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import css from './MovieCast.module.css';

const MovieCast = ({ loading, setLoading }) => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCredits(movieId);
        setCast(data.cast);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieCast();
  }, [setLoading, movieId]);

  return (
    <>
      {loading && <Loader />}
      {cast.length === 0 ? (
        <p>We dont have any information about actors</p>
      ) : (
        <ul className={css.list}>
          {cast.map(actor => {
            return (
              <li key={actor.id} className={css.item}>
                <div className={css.imgBlock}>
                  <img
                    src={
                      actor.profile_path !== null
                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                        : `https://www.shutterstock.com/shutterstock/photos/2059817444/display_1500/stock-vector-no-image-available-photo-coming-soon-illustration-vector-2059817444.jpg`
                    }
                    alt={actor.name}
                    className={css.img}
                  />
                </div>
                <div className={css.infoBlock}>
                  <p>{actor.name}</p>
                  <p>Character: {actor.character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
