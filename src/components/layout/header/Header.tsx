import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import SearchBar from "../SearchBar";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar disableGutters>
        <Container maxWidth="sm">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Movie App
          </Typography>
          <SearchBar />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
