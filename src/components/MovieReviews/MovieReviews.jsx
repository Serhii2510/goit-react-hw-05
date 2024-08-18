import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import css from './MovieReviews.module.css';

const MovieReviews = ({ loading, setLoading }) => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [setLoading, movieId]);

  return (
    <>
      {loading && <Loader />}
      {reviews.length === 0 ? (
        <p>We dont have any information about reviews</p>
      ) : (
        <ul className={css.list}>
          {reviews.map(review => {
            return (
              <li key={review.id} className={css.item}>
                <h3 className={css.title}>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
