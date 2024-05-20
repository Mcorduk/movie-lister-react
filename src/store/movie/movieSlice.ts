import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedYear: string | null;
  type: "movie" | "series" | "episode" | null;
  selectedMovie: Movie | null;
  currentPage: number;
  totalPages: number;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  searchTerm: "Pokemon",
  selectedYear: null,
  type: null,
  selectedMovie: null,
  currentPage: 1,
  totalPages: 0,
};

interface FetchMoviesResult {
  Search: Movie[];
  totalResults: string;
}

// Async thunk for fetching movies from OMDb API
export const fetchMovies = createAsyncThunk<
  FetchMoviesResult,
  { searchTerm: string; type?: string; year?: string; page?: number | 1 },
  { rejectValue: { message: string } }
>(
  "movies/fetchMovies",
  async ({ searchTerm, type, year, page = 1 }, { rejectWithValue }) => {
    try {
      const apiKey = "YOUR_OMDB_API_KEY";
      const pageSize = 10;
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&type=${type}&y=${year}&page=${page}&apikey=${apiKey}`
      );
      const totalResults = parseInt(response.data.totalResults || "0");
      const totalPages = Math.ceil(totalResults / pageSize);
      return { movies: response.data.Search || [], totalPages };
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

// Movie data slice with reducers and actions
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedYear(state, action: PayloadAction<string>) {
      state.selectedYear = action.payload;
    },
    setType(state, action: PayloadAction<"movie" | "series" | "episode">) {
      state.type = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<Movie>) {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search;
        state.currentPage = action.meta.arg.page || 1;
        // Calculate totalPages based on totalResults from API and the page size
        const totalResults = parseInt(action.payload.totalResults, 10);
        state.totalPages = Math.ceil(totalResults / 10);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        // Check if error response matches the API's error format
        if (action.error.message === "Network Error") {
          state.error = "Network Error: Failed to connect to the API.";
        } else if (action.error.response?.data?.Response === "False") {
          state.error = action.error.response.data.Error;
        } else {
          state.error = action.error.message || "Unexpected Error"; // Default error message
        }
      });
  },
});

export const { setSearchTerm, setSelectedYear, setType, setSelectedMovie } =
  movieSlice.actions;

export default movieSlice.reducer;
