import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm, setSelectedYear, setType } from "./movieSlice";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { fetchMovies } from "../../store/movie/movieSlice";
import styles from "./SearchBar.module.scss"; // Import styles

const SearchBar = () => {
  const [searchTerm, setSearchTermValue] = useState("");
  const [selectedYear, setSelectedYearValue] = useState("");
  const [type, setTypeValue] = useState("");
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchMovies({ searchTerm, year: selectedYear, type }));
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={styles.searchForm} // Use className instead of sx
    >
      <TextField
        label="Search Movies"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTermValue(e.target.value)}
        fullWidth
        className={styles.searchField} // Use className instead of sx
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
