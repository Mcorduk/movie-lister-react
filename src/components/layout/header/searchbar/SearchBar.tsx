import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  fetchMovies,
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

const SearchBar = () => {
  const [searchTerm, setSearchTermValue] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTerm));
    dispatch(setSelectedYear(year));
    dispatch(setSelectedType(type));
    const yearToSend = year ? year : null;
    const typeToSend = type || null;
    dispatch(fetchMovies({ searchTerm, year: yearToSend, type: typeToSend }));
  };

  const handleTypeChange = (e, newType: string) => {
    setType(newType === "all" ? "" : newType);
  };

  return (
    <Box>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <IconButton
          onClick={() => setShowInput(!showInput)}
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
            className={styles.searchField} // Use className instead of sx
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
                  onChange={(event, newType) =>
                    handleTypeChange(event, newType)
                  }
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
