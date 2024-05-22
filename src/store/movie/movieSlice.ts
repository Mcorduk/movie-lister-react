import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
}

export interface MovieDetail extends Movie {
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
}

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedYear: string | null;
  type: "movie" | "series" | "episode" | null;
  selectedMovie: MovieDetail | null;
  currentPage: number;
  totalPages: number;
}

export const initialState: MovieState = {
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

export interface FetchMoviesInput {
  searchTerm: string;
  type?: string | null;
  year?: string | null;
  page: number;
}

interface OMDBError extends Error {
  readonly Error: Error;
  readonly Response: Response;
}

// Async thunk for fetching movies from OMDb API
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (
    { searchTerm, type, year, page = 1 }: FetchMoviesInput,
    { rejectWithValue }
  ) => {
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const pageSize = 10;
      let url = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=${apiKey}`;

      if (type) {
        url += `&type=${type}`;
      }

      if (year) {
        url += `&y=${year}`;
      }

      const response = await axios.get(url);

      if (response.data.Response === "False") {
        return rejectWithValue(response.data);
      }

      const totalResults = parseInt(response.data.totalResults || "0");
      const totalPages = Math.ceil(totalResults / pageSize);
      return { movies: response.data.Search || [], totalPages };
    } catch (err) {
      const error = err as AxiosError<OMDBError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching movie details from OMDb API
export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.Response === "False") {
        return rejectWithValue(response.data);
      }

      return response.data as MovieDetail;
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
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
    setSelectedYear(state, action: PayloadAction<string | null>) {
      state.selectedYear = action.payload;
    },
    setSelectedType(
      state,
      action: PayloadAction<"movie" | "series" | "episode" | null>
    ) {
      state.type = action.payload;
    },
    setSelectedMovie(state, action: PayloadAction<MovieDetail>) {
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
        state.movies = action.payload.movies;
        state.currentPage = action.meta.arg.page || 1;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Network Error") {
          state.error = "Network Error: Failed to connect to the API.";
        } else {
          state.error = action.error.message ?? "Something went wrong";
        }
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Network Error") {
          state.error = "Network Error: Failed to connect to the API.";
        } else {
          state.error = action.error.message ?? "Something went wrong";
        }
      });
  },
});

export const {
  setSearchTerm,
  setSelectedYear,
  setSelectedType,
  setSelectedMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
