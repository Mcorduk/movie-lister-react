import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movie/movieSlice";
import MovieItem from "./MovieItem";
import styles from "./MovieList.module.scss";
import { RootState } from "../store/store";
import { MovieState } from "../store/movie/movieSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const MovieList: React.FC = () => {
  const dispatch =
    useDispatch<ThunkDispatch<MovieState, undefined, UnknownAction>>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  useEffect(() => {
    // Dispatch the fetchMovies thunk with an initial search term and page 1
    dispatch(fetchMovies({ searchTerm: "Pokemon", page: 1 }));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container className={styles.movieList} spacing={2}>
      {movies.map((movie, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <MovieItem movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
