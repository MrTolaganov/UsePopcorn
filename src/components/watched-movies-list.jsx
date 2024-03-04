import WatchedMovie from "./watched-movie";

const WatchedMoviesList = ({ watched, onDeleteWatched }) => (
  <ul className="list">
    {watched.map(movie => (
      <WatchedMovie
        movie={movie}
        key={movie.imdbID}
        onDeleteWatched={onDeleteWatched}
      />
    ))}
  </ul>
);

export default WatchedMoviesList;
