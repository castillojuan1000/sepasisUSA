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
      marginRight: theme.spacing(0),
      fontSize: '12px'
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={`${SepasisImage}`} alt='sepasisUSA' style={{ width: '90px', height: '90px' }} />

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