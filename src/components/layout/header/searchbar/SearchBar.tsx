import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  fetchMovies,
  MovieState,
  setSelectedType,
  setSelectedYear,
} from "../../../../store/movie/movieSlice";
import styles from "./SearchBar.module.scss"; // Import styles
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../../store/movie/movieSlice";
import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { UnknownAction } from "redux";

const SearchBar = () => {
  const [searchTerm, setSearchTermValue] = useState("Pokemon");
  const [year, setYear] = useState("");
  const [type, setType] = useState<"movie" | "series" | "episode" | null>(null);
  const [showInput, setShowInput] = useState(false);
  const dispatch =
    useDispatch<ThunkDispatch<MovieState, undefined, UnknownAction>>();

  const handleSearchSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTerm));
    dispatch(setSelectedYear(year));
    dispatch(setSelectedType(type));
    const yearToSend = year ? year : null;
    const typeToSend = type || null;
    dispatch(
      fetchMovies({
        searchTerm,
        year: yearToSend,
        type: typeToSend,
        page: 1,
      })
    );
  };

  const handleTypeChange = (
    _e,
    newType: "movie" | "series" | "episode" | "" | null
  ) => {
    setType(newType === "" ? null : newType);
  };

  return (
    <Box>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <IconButton
          onClick={() => {
            setYear("");
            setType(null);
            setShowInput(!showInput);
          }}
          aria-label="toggle input"
        >
          {showInput ? <FilterAltIcon /> : <FilterListOffIcon />}
        </IconButton>
        <Container className={styles.searchFilterBox}>
          <TextField
            label="Search Movies"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTermValue(e.target.value)}
            fullWidth
            className={styles.searchField}
          />
          {showInput && (
            <>
              <TextField
                label="Filter by Year (Optional)"
                variant="outlined"
                size="small"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
                className={styles.searchField}
              />
              {
                <ToggleButtonGroup
                  className={styles.toggleButtonGroup}
                  value={type}
                  onChange={(e, newType) => handleTypeChange(e, newType)}
                  exclusive
                >
                  <ToggleButton value="">All</ToggleButton>
                  <ToggleButton value="movie">Movie</ToggleButton>
                  <ToggleButton value="series">Series</ToggleButton>
                  <ToggleButton value="episode">Episode</ToggleButton>
                </ToggleButtonGroup>
              }
            </>
          )}
        </Container>
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </Box>
  );
};

export default SearchBar;
