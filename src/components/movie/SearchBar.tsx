import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./SearchBar.module.css";

const SearchBar = (props: any) => {
  const searchContent = useSelector((state: any) => state.movie.searchContent);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer = setTimeout(() => {
    }, 650);
    return () => {
      clearTimeout(timer);
    };
  }, [searchContent, dispatch]);

  const handleSearchInput = (event: any) => {
    // dispatch(movieActions.setSearchContent(event.target.value));
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.searchBar}>
        <input
          className={classes.searchQueryInput}
          type="text"
          name="searchQueryInput"
          placeholder="Search favorite Movies and TV Shows"
          value={searchContent}
          onChange={handleSearchInput}
        />
        <button
          className={classes.searchQuerySubmit}
          type="submit"
          name="searchQuerySubmit"
        >
          <FontAwesomeIcon icon={faSearch} className={classes.icon} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;