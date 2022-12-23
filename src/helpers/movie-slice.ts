import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    allContent: [],
    movies: [],
    series: [],
    showMovies: true,
    showSeries: false,
    searchContent: "",
    contentIsLoading: true,
    visibleMovies: 10,
    showLoadContentButton: true,
  },
  reducers: {
    replaceContentList(state, action) {
      if (!action.payload.newRatingsRecieved) {
        state.visibleMovies = 10;
      }
      state.allContent = action.payload.content;
      state.movies = action.payload.content
        .filter((m: any) => m.isMovie)
        .slice(0, state.visibleMovies);
      state.series = action.payload.content
        .filter((m: any) => !m.isMovie)
        .slice(0, state.visibleMovies);
      state.contentIsLoading = false;
      if (!action.payload.newRatingsRecieved) {
        state.showLoadContentButton = true;
      }
    },
    showMovies(state) {
      if (!state.showMovies) {
        state.showMovies = !state.showMovies;
        state.showSeries = !state.showSeries;
        state.visibleMovies = 10;
        state.movies = state.movies.slice(0, state.visibleMovies);
        if (state.movies.length <= state.visibleMovies) {
          state.showLoadContentButton = true;
        } else {
          state.showLoadContentButton = false;
        }
      }
    },
    showSeries(state) {
      if (!state.showSeries) {
        state.showSeries = !state.showSeries;
        state.showMovies = !state.showMovies;
        state.visibleMovies = 10;
        state.series = state.series.slice(0, state.visibleMovies);
        if (state.series.length <= state.visibleMovies) {
          state.showLoadContentButton = true;
        } else {
          state.showLoadContentButton = false;
        }
      }
    },
    setSearchContent(state, action) {
      if (state.searchContent !== "") {
        if (!state.contentIsLoading) {
          state.contentIsLoading = true;
        }
        state.searchContent = action.payload;
      } else {
        state.searchContent = action.payload;
        state.contentIsLoading = false;
      }
    },
    replaceContentAfterSearch(state, action) {
      state.allContent = action.payload.content;
      state.visibleMovies = 10;
      if (state.allContent.length <= state.visibleMovies) {
        state.showLoadContentButton = false;
      } else {
        state.showLoadContentButton = true;
      }
      if (state.showMovies) {
        state.movies = action.payload.content.slice(0, state.visibleMovies);
      } else if (state.showSeries) {
        state.series = action.payload.content.slice(0, state.visibleMovies);
      }
      state.contentIsLoading = false;
    },
    setContentLoading(state, action) {
      state.contentIsLoading = action.payload;
    },
    increaseVisibleMovies(state, action) {
      state.visibleMovies += 10;
      if (state.showMovies) {
        const filteredContent = state.allContent.filter(
          (m: any) =>
            (m.isMovie && state.searchContent === "") ||
            state.searchContent !== ""
        );
        if (filteredContent.length <= state.visibleMovies) {
          state.showLoadContentButton = false;
        }
        state.movies = filteredContent.slice(0, state.visibleMovies);
      } else if (state.showSeries) {
        const filteredContent = state.allContent.filter(
          (m: any) =>
            (!m.isMovie && state.searchContent === "") ||
            state.searchContent !== ""
        );
        if (filteredContent.length <= state.visibleMovies) {
          state.showLoadContentButton = false;
        }
        state.series = filteredContent.slice(0, state.visibleMovies);
      }
    },
    resetSearchResults(state) {
      state.searchContent = "";
      state.visibleMovies = 10;
      state.showLoadContentButton = true;
    },
    setShowLoadContentButton(state, action) {
      state.showLoadContentButton = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;