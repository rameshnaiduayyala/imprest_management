import { useStyles } from "../styles/Footer";
import { Grid } from "@material-ui/core";
function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <a href="https://www.facebook.com">
          </a>
        </Grid>
        <Grid item>
          <a href="https://www.twitter.com">
          </a>
        </Grid>
        <Grid item>
          <a href="https://www.google.com">
          </a>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
