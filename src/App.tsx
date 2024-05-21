// App.tsx
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/layout/Layout";
import MovieItem from "./components/MovieItem";

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
      <Layout>{<MovieItem />}</Layout>
    </ThemeProvider>
  );
};

export default App;
