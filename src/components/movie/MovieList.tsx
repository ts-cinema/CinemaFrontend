import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import MovieItem from "./MovieItem";
import classes from "./MovieList.module.css";

const MovieList = (props:any) => {
  const dispatch = useDispatch();
  // const visibleMovies = useSelector((state: any) => state.movie.visibleMovies);
  // const allContent = useSelector((state: any) => state.movie.allContent);
  /*const showLoadContentButton = useSelector(
    (state: any) => state.movie.showLoadContentButton
  );
  const searchContent = useSelector((state: any) => state.movie.searchContent);

  const loadMoreContentHandler = () => {
    if (
      allContent.filter(
        (m:any) =>
          (m.isMovie === props.isMovie && searchContent === "") ||
          searchContent !== ""
      ).length > visibleMovies
    ) {
      // dispatch(movieActions.increaseVisibleMovies());
    }
  };*/

  const showLoadContentButton = false

  const loadMoreContentHandler = () => {

  }

  return (
    <div className={classes.container}>
      <section className={classes.movies}>
        {props.contentList.map((movie: any) => (
          <Card key={movie.id.toString()}>
            <MovieItem movie={movie} />
          </Card>
        ))}
      </section>
      {!props.noResultsFound && showLoadContentButton && (
        <button className={classes.loadButton} onClick={loadMoreContentHandler}>
          <FontAwesomeIcon icon={faSpinner} />
          &nbsp; Load more
        </button>
      )}
    </div>
  );
};

export default MovieList;
