import Movie from "./movie";

const MoviesList = ({ movies, onSelectedMovie }) => (
  <ul className="list list-movies">
    {movies?.map(movie => (
      <Movie key={movie.imdbID} movie={movie} onClick={onSelectedMovie} />
    ))}
  </ul>
);

export default MoviesList;
