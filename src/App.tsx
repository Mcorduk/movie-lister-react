import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails"; // Assuming you have a MovieDetails component
import "./styles/global.scss";
import { Container } from "@mui/material";
import MoviePagination from "./components/layout/pagination/MoviePagination";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Container className="wrapper">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <MovieList />
                    <MoviePagination />
                  </>
                }
              />
              <Route
                path="/movie/:movieId"
                element={<MovieDetails/>}
              />{" "}
            </Routes>
          </Container>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
