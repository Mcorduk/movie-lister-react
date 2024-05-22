import { AppBar, Toolbar, Container, Typography } from "@mui/material";
import styles from "./Header.module.scss";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Container maxWidth="sm">
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={styles.title}
          >
            Movie App
          </Typography>
          {children}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
