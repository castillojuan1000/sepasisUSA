import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { signOut } from '../firebase'
import SepasisImage from '../photos/sepasis2.png'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
      fontSize: '10px'
    },
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0
    },
  },
  title: {
    flexGrow: 1,
  },
  image: {
    width: '100px',
    height: '100px',
    [theme.breakpoints.down('sm')]: {
      width: '90px',
      height: '90px',
    },
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <img src={`${SepasisImage}`} alt='sepasisUSA' className={classes.image} />

          <Typography className={classes.title}></Typography>

          <Link to='/profile' style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit" className={classes.menuButton}>Profile</Button>
          </Link>

          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit" className={classes.menuButton}>Posts</Button>
          </Link>


          <Button color="inherit" onClick={signOut} className={classes.menuButton}>signout</Button>


        </Toolbar>
      </AppBar>
    </div>
  );
}