import { Link, useLocation } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className={css.container}>
      <h2> Sorry... Page is not found </h2>
      <Link to="/" state={location} className={css.linkBack}>
        Back to main page
      </Link>
    </div>
  );
};

export default NotFoundPage;
