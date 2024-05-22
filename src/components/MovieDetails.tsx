import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { fetchMovieDetails } from "../store/movie/movieSlice"; // Assuming moviesSlice defines fetchMovieDetails
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { ArrowBack } from "@mui/icons-material";
import styles from "./MovieDetails.module.scss";
const MovieDetails = () => {
  const { movieId: imdbID } = useParams();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, UnknownAction>>();
  const selectedMovie = useSelector(
    (state: RootState) => state.movies.selectedMovie
  );
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch movie details on init render or when imdbID changes
    if (!selectedMovie || selectedMovie.imdbID !== imdbID) {
      dispatch(fetchMovieDetails(imdbID));
    }
  }, [dispatch, imdbID, selectedMovie]);

  if (!selectedMovie || selectedMovie.imdbID !== imdbID) {
    return <div>Loading movie details...</div>; // Display loading indicator
  }

  const {
    Title,
    Year,
    Genre,
    Director,
    Actors,
    Plot,
    Awards,
    Poster,
    Ratings,
  } = selectedMovie;

  const imdbRating = Ratings?.find(
    (rating) => rating.Source === "Internet Movie Database"
  )?.Value; // Extract IMDb  from object

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <IconButton onClick={handleBack} aria-label="Back" color="primary">
        <ArrowBack />
      </IconButton>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <CardMedia
            component="img"
            image={Poster}
            alt={Title}
            className={styles.cardMedia}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {Title} ({Year})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Genre: {Genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Director: {Director}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cast: {Actors}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              IMDb Rating: {imdbRating}
            </Typography>
            <Typography variant="body2" component="p">
              Plot: {Plot}
            </Typography>
            {Awards && (
              <Typography variant="body2" color="text.secondary">
                Awards: {Awards}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default MovieDetails;
