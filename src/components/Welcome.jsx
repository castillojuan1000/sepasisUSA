import React from 'react';
import WelcomeImage from '../photos/welcome.jpg'
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const backgroundStyle = {
  backgroundImage: `url(${WelcomeImage})`,
  height: "100vh",
  width: "100%",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}

export default function Welcome() {
  const classes = useStyles();
  return (
    <div className="homepage" style={backgroundStyle}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid
          style={{
            paddingTop: '20vh'
          }}
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              use typology for title, welcome, buttons
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
