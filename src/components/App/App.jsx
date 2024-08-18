import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

const Navigation = lazy(() => import('../Navigation/Navigation'));
const Loader = lazy(() => import('../Loader/Loader'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <MoviesPage
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetailsPage
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            }
          >
            <Route
              path="cast"
              element={<MovieCast loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="reviews"
              element={
                <MovieReviews loading={loading} setLoading={setLoading} />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
