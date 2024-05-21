// MovieItem.tsx
import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./MovieItem.module.scss";

interface MovieItemProps {
  movie: {
    Title: string;
    Year: string;
    Poster: string;
  };
}
const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
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
      </CardContent>
    </Card>
  );
};

export default MovieItem;
