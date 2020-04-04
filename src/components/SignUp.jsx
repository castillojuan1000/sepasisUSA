
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth } from '../firebase'
import { createUserProfileDocument } from '../firebase'
import { Link as LinkFromRouter } from "react-router-dom";


export default function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const handleName = (e) => {
    const name = e.target.value;
    setName(name)
  }

  const handleLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName)
  }

  const handleEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const handlePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = name.charAt(0).toUpperCase() + name.slice(1)
    const userLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const displayName = userName + " " + userLastName;


    try {
      //? this will create user signing up using email and password
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      console.log({
        SignUp: user
      })

      //? this will add propertiers to the user once it's been created. 
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error)
    }

    setName('')
    setLastName('')
    setEmail('')
    setPassword('');

  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={name}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={handleLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item >
              <LinkFromRouter href="#" variant="body2" to="/signIn">
                {"Already have an account? Sign In"}
              </LinkFromRouter>
            </Grid>
            <Grid item >
              <LinkFromRouter href="#" variant="body2" to="/" >
                {"Back Home"}
              </LinkFromRouter>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://juancastillo.dev/">
        <span style={{ color: '#3F51B5' }}>

          JuanCastillo✞
        </span>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));