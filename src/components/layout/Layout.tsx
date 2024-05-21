// layout.tsx
import React from "react";
// import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import SearchBar from "./header/searchbar/SearchBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // TODO: Make me useful
  // const isMobile = useMediaQuery("(max-width: 600px)");
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

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <SearchBar />
      </Header>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
