import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import styles from "./MovieList.module.scss";
import { RootState } from "../store/store";

const MovieList: React.FC = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);

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
