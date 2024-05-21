import { Container, Typography } from "@mui/material";
import styles from "./Footer.module.scss";
function Footer() {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 Muhammet Corduk
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
