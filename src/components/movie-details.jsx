import { useEffect, useRef, useState } from "react";
import Loader from "../ui/Loader";
import StarRating from "./star-rating";
import { useKey } from "../hooks/useKey";

const MovieDetails = ({ id, watched, onCloseSelected, onAddWatched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  const isWatched = watched
    .map(watchedMovie => watchedMovie.imdbID)
    .includes(id);

  const useWatchedRating = watched.find(
    watchedMovie => watchedMovie.imdbID === id
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const onAddHandler = () => {
    const newWatchedMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: +runtime.split(" ").at(0),
      userRating,
      countRating: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseSelected();
  };

  useEffect(() => {
    const getMovie = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovie();
  }, [id]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn");
  }, [title]);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useKey("Escape", onCloseSelected);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelected}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <p>You have already rated ⭐{useWatchedRating}</p>
              ) : (
                <>
                  <StarRating maxRating={10} onSetUserRating={setUserRating} />
                  {userRating && (
                    <button className="btn-add" onClick={onAddHandler}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

const API_KEY = "f0a06259";
