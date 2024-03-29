import React from 'react';
import WelcomeImage from '../photos/welcome.jpg'
import SepasisImage from '../photos/sepasis1.png'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom'




import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(128,128,128, 0.5)',
    zIndex: 10,
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto',
      padding: theme.spacing(0),
      height: '80vh'
    },


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
      <Container maxWidth="md">
        <Grid
          style={{
            paddingTop: '10vh'
          }}
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {/* <Typography variant="h3" gutterBottom>
                SepasisUSA
              </Typography> */}
              <img src={`${SepasisImage}`} alt='sepasisUSA' style={{ width: '150px', height: '150px' }} />

              <Typography variant="subtitle2" gutterBottom style={{ margin: '0 auto 20px' }}>
                Los Sepasis somos una grupo de jovenes Catolicos que an nacido para trabajar en la tarea de la evangelización con las herramientas dadas despues de nuestra experiecia misionera.
                <br />
                <br />
                Si tu eres un joven sepasi te invitamos a unirte a este espacio creado para compartir eventos, experiencias y acompañarnos en oracios unos con los otros.
              </Typography>
              <Grid container

                direction="row"
                justify="center"
                alignItems="center">

                <Grid item xs={12} sm={6}>
                  <Link to='/signIn'
                    style={{ textDecoration: 'none', color: 'white' }}>

                    <MyButton
                      type="submit"
                      value="Submit"
                      color="blue"
                    >
                      sign in
                  </MyButton>
                  </Link>

                </Grid>
                <Grid item xs={12} sm={6}>

                  <Link to='/signUp'
                    style={{ textDecoration: 'none', color: 'white' }}>

                    <MyButton
                      type="submit"
                      value="Submit"
                      color="red"
                    >
                      sign up
                  </MyButton>
                  </Link>

                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const styles = {
  root: {
    background: props =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
    width: '80%'
  },
};

function MyButtonRaw(props) {
  const { classes, color, ...other } = props;
  return <Button className={classes.root} {...other} />;
}

MyButtonRaw.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['blue', 'red']).isRequired,
};

const MyButton = withStyles(styles)(MyButtonRaw);

