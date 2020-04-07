import React, { useState, Fragment } from 'react';
import { auth, firestore, storage } from '../firebase';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CurrentUser from './CurrentUser/CurrentUser'

import '../UserProfile.css'


const UserProfile = () => {
  const classes = useStyles();

  const [displayName, setDisplayName] = useState('')

  let imageInput = null;

  const uid = () => {
    return auth.currentUser.uid;
  }

  const userRef = () => {
    return firestore.doc(`users/${uid()}`)
  }

  const file = () => {
    //? if image input is not null get me the first file
    return imageInput && imageInput.files[0]
  }

  const handleDisplayName = (e) => {
    setDisplayName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (displayName) {
      userRef().update({
        displayName: displayName
      })
    }

    if (file()) {
      storage
        .ref()
        .child('user-profiles')
        .child(uid())
        .child(file().name)
        .put(file())
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => userRef().update({
          photoURL: photoURL
        }))
    }
    setDisplayName('')
  }

  return (
    <div >
      <Grid
        style={{
          paddingTop: '5vh',

        }}
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={12} >

          <CurrentUser />
        </Grid>

        <Grid item xs={12} >

          <form
            className={classes.root}
            onSubmit={handleSubmit}>

            <Grid container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center">
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <TextField

                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Change Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={displayName}
                    name="content"
                    onChange={handleDisplayName}
                  />

                  <div className="file-upload">
                    <div className="file-select">
                      <div className="file-select-button" id="fileName">
                        Profile Picture
                </div>
                      <div className="file-select-name" id="noFile">
                        No file chosen...
                </div>
                      <input type="file" namename="chooseFile" id="chooseFile" ref={ref => imageInput = ref} />
                    </div>
                  </div>

                  <MyButton
                    type="submit"
                    value="Submit"
                    color="blue"
                  >
                    Submit
                  </MyButton>
                </Paper>
              </Grid>

            </Grid>

          </form>
        </Grid>
      </Grid>

    </div>
  )
}

export default UserProfile;





const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: 'auto ',
    maxWidth: "70%",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    // marginTop: theme.spacing(3)
  },
}));

//?buttons
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