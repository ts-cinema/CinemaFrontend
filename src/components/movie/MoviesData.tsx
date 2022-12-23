import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
// import classes from "./MoviesData.module.css";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import NoSearchResults from "./NoSearchResults";
import interceptionAxios from "../../api/InterceptionAxios";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./SearchBar.module.css";

import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import * as React from 'react';

const MoviesData = (props: any) => {
  // const movies = useSelector((state: any) => state.movie.movies);
 //  const contentIsLoading = useSelector((state: any) => state.movie.contentIsLoading);
  // const searchContent = useSelector((state: any) => state.movie.searchContent);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [date, setDate] = useState(null);

  function checkProjectionDate(projection: any) {
    if (date != null) {
      var projectionDate = new Date(projection.start_time);
      var searchDate = new Date(date);
      return projectionDate.toLocaleDateString("en-GB") === searchDate.toLocaleDateString("en-GB");
    }
  }
  
  function checkFilter(movie: any) {
    if (date != null && searchContent == "") {
      movie.projections.filter(checkProjectionDate)

      return movie.projections.some(checkProjectionDate);
    }
    else if (date != null && searchContent != ""){
      return (movie.title.toLowerCase().includes(searchContent.toLowerCase()) || movie.genre.toLowerCase().includes(searchContent.toLowerCase()))
      && movie.projections.some(checkProjectionDate);
    }
    else if (date == null && searchContent != "") {
      return movie.title.toLowerCase().includes(searchContent.toLowerCase()) || movie.genre.toLowerCase().includes(searchContent.toLowerCase());
    }
  }

  const setSearchDate = (searchDate: any) => {
    setDate(searchDate);
};

  const getMovies = async () => {

    await interceptionAxios.get(`api/v1/cinema/movies`).then((res: any) => {
      if (searchContent == "" && date == null) {
        setMovies(res.data);
        setFilteredMovies(res.data);
      }
      else {
        setFilteredMovies(movies.filter(checkFilter));
        console.log(filteredMovies.length)
      } 
    });
    return () => {
        //
    };
};

  useEffect(() => {
    getMovies();
  }, [searchContent, date]);

  const showNotFound = false

  const handleSearchInput = (event: any) => {
    setSearchContent(event.target.value)
    // dispatch(movieActions.setSearchContent(event.target.value));
  };

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
      <div className={classes.wrapper}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                  className="picker"
                  label="Select projection date"
                  disablePast
                  value={value}
                  onChange={(newValue: any) => {
                    setValue(newValue)
                    setSearchDate(newValue)
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
              />
          </LocalizationProvider>
          <div className={classes.searchBar}>
            <input
              className={classes.searchQueryInput}
              type="text"
              name="searchQueryInput"
              value = {searchContent}
              placeholder="Search by title or genre"
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
      <MovieList
        contentList={filteredMovies}
        noResultsFound={showNotFound}
        isMovie={true}
      />
    </Fragment>
  );
};

export default MoviesData;