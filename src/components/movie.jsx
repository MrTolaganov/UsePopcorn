const Movie = ({ movie, onClick }) => {
  const { imdbID, Poster, Title, Year } = movie;

  return (
    <li className="list list-movies" onClick={() => onClick(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
