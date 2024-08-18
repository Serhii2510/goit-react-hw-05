import axios from "axios";

const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjNlODY5OTRhOGIzODIzN2NiNjU2MDY3M2E3YmY0MSIsIm5iZiI6MTcyMzk4ODU4NC4zODA0NDUsInN1YiI6IjY2YzA5YTE0NzhjOTJlZDlkYmRlYjMxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d1Jf0VFyj-UrrSg_-KhMSeq5DwmLlkwqpjW6s7XEKmo'
  }
};

export const fetchTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const { data } = await axios.get(url, options);  
  return data.results;
  };

export const fetchFoundMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const { data } = await axios.get(url, options);
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMovieCredits = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&page=1`;
  const { data } = await axios.get(url, options);    
  return data;
};

export const fetchMovieReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  const { data } = await axios.get(url, options);  
  return data.results;
};