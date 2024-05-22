import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./MovieItem.module.scss";
import { Link } from "react-router-dom";
import { Movie } from "../store/movie/movieSlice";

const MovieItem: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <Card className={styles.movieItem}>
      <CardMedia
        component="img"
        height="140"
        image={movie.Poster}
        alt={movie.Title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.Year}
        </Typography>
        <Link to={`/movie/${movie.imdbID}`} className={styles.viewButton}>
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default MovieItem;
