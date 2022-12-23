import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import classes from "./MoviesData.module.css";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import NoSearchResults from "./NoSearchResults";
import interceptionAxios from "../../api/InterceptionAxios";

const MoviesData = (props: any) => {
  // const movies = useSelector((state: any) => state.movie.movies);
 //  const contentIsLoading = useSelector((state: any) => state.movie.contentIsLoading);
  // const searchContent = useSelector((state: any) => state.movie.searchContent);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {

    await interceptionAxios.get(`api/v1/cinema/movies`).then((res: any) => {
        setMovies(res.data);
    });
    return () => {
        //
    };
};

  useEffect(() => {
    getMovies();
  }, [dispatch]);

  const showNotFound = false

  /*const showNotFound =
    !contentIsLoading &&
    ((initialMovies.length === 0)) &&
    searchContent.length > 1; */

  return (
    <Fragment>
      {showNotFound && (
        <NoSearchResults
          title={"No results found"}
          description={"We couldn't find any results matching your input"}
          icon={faFrown}
          iconSize={"9x"}
        />
      )}
        <MovieList
          contentList={movies}
          noResultsFound={showNotFound}
          isMovie={true}
        />
    </Fragment>
  );
};

export default MoviesData;