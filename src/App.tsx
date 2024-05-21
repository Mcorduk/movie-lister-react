// App.tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import MovieList from "./components/MovieList";
import "./styles/global.scss";
import { Container } from "@mui/material";

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
      <Layout>
        {
          <Container className="wrapper">
            <MovieList />
          </Container>
        }
      </Layout>
    </ThemeProvider>
  );
};

export default App;
