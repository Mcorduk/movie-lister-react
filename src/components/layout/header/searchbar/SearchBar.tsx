import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import {
  fetchMovies,
  setSelectedYear,
} from "../../../../store/movie/movieSlice";
import styles from "./SearchBar.module.scss"; // Import styles
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../../store/movie/movieSlice";
import { Button, ButtonGroup, Container } from "@mui/material";

const SearchBar = () => {
  const [searchTerm, setSearchTermValue] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState(""); // New state for type
  const [showInput, setShowInput] = useState(false); // New state for toggling input
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTerm));
    const yearToSend = selectedYear ? selectedYear : null; // Handle empty year
    const typeToSend = selectedType || null; // Handle empty type (All)
    dispatch(fetchMovies({ searchTerm, year: yearToSend, type: typeToSend }));
  };

  const handleTypeChange = (event, newType) => {
    setSelectedType(newType);
  };

  return (
    <Box>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <IconButton
          onClick={() => setShowInput(!showInput)}
          aria-label="toggle input"
        >
          <FilterListOffIcon />
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
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                fullWidth
                className={styles.searchField}
              />
              {/* <ButtonGroup className={styles.buttonGroup} variant="outlined" aria-label="type">
                <Button onClick={() => handleTypeChange("", "all")}>All</Button>
                <Button onClick={() => handleTypeChange("", "movie")}>
                  Movie
                </Button>
                <Button onClick={() => handleTypeChange("", "series")}>
                  Series
                </Button>
                <Button onClick={() => handleTypeChange("", "episode")}>
                  Episode
                </Button>
              </ButtonGroup> */}
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
