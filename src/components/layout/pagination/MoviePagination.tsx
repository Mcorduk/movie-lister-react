import React, { useEffect } from "react";
import styles from "./MoviePagination.module.scss";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchMovies, MovieState } from "../../../store/movie/movieSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { UnknownAction } from "redux";

const MoviePagination = () => {
  const dispatch =
    useDispatch<ThunkDispatch<MovieState, undefined, UnknownAction>>();
  const searchTerm = useSelector((state: RootState) => state.movies.searchTerm);
  const type = useSelector((state: RootState) => state.movies.type);
  const year = useSelector((state: RootState) => state.movies.selectedYear);
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage
  );
  const totalPages = useSelector((state: RootState) => state.movies.totalPages);

  useEffect(() => {
    dispatch(fetchMovies({ searchTerm, page: currentPage, type, year }));
  }, [dispatch, currentPage, searchTerm, type, year]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchMovies({ searchTerm, page: value, type, year }));
  };

  return (
    <Pagination
      className={styles.pagination}
      onChange={handleChange}
      page={currentPage}
      count={totalPages}
    />
  );
};

export default MoviePagination;
