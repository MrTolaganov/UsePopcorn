import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import Navbar from "./navbar";
import Main from "./main";
import Search from "./search";
import NumResults from "./num-results";
import MoviesList from "./movies-list";
import Box from "./box";
import WatchedMoviesSummary from "./watched-movies-summary";
import WatchedMoviesList from "./watched-movies-list";
import Loader from "../ui/Loader";
import ErrorMsg from "../ui/ErrorMsg";
import MovieDetails from "./movie-details";
import { useLsState } from "../hooks/useLsState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watched, setWatched] = useLsState("watched", []);
  const { movies, isLoading, errorMsg } = useMovies(query);

  const onSelectedMovie = id =>
    setSelectedMovie(selectedMovie => (selectedMovie === id ? null : id));

  const onCloseSelected = () => setSelectedMovie(null);

  const onAddWatched = movie => setWatched(watched => [...watched, movie]);

  const onDeleteWatched = id =>
    setWatched(watched =>
      watched.filter(watchedMovie => watchedMovie.imdbID !== id)
    );

  return (
    <>
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
          onCloseSelected={onCloseSelected}
        />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {errorMsg && <ErrorMsg message={errorMsg} />}
          {!isLoading && !errorMsg && (
            <MoviesList movies={movies} onSelectedMovie={onSelectedMovie} />
          )}
        </Box>

        <Box>
          {selectedMovie ? (
            <MovieDetails
              id={selectedMovie}
              watched={watched}
              onCloseSelected={onCloseSelected}
              onAddWatched={onAddWatched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={onDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
