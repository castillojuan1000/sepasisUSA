import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { firestore } from '../firebase';
import { UsersContext } from '../providers/UsersProvider'




export default function AddPost() {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const user = useContext(UsersContext);


  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleContent = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    //todo: this will come from firebase 
    // const { uid, displayName, photoURL, email } = auth.currentUser || {};
    const { uid, displayName, photoURL, email } = user;



    const post = {
      background: newGradient(),
      title: title,
      content: content,
      user: {
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL
      },
      comments: 0,
      likes: 0,
      dislikes: 0,
      createdAt: new Date()
    }


    firestore.collection('posts').add(post)



    setTitle('')
    setContent('')

  }




  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center">
        <Grid item xs={12}>
          <Paper
            className={classes.paper}
            style={{
              background: `linear-gradient(49deg, rgba(184,40,45,0.742734593837535) 
            0%, rgba(193,214,41,0.6951155462184874) 33%, rgba(252,176,69,1) 100%)`
            }}
          >
            <TextField

              label="Title"
              style={{ margin: 8 }}
              placeholder="Title"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="title"
              value={title}
              onChange={handleTitle}
            />
            <TextField

              label="Message"
              style={{ margin: 8 }}
              placeholder="Message"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              multiline
              rows="2"
              name="content"
              value={content}
              onChange={handleContent}
            />


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
    </form >
  )
}


//? textfieds 
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: 'auto ',
    maxWidth: "80%",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
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


//? will generate a random gradient color 
function newGradient() {
  var c1 = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  };
  var c2 = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
  };
  c1.rgb = 'rgb(' + c1.r + ',' + c1.g + ',' + c1.b + ')';
  c2.rgb = 'rgb(' + c2.r + ',' + c2.g + ',' + c2.b + ')';
  return 'radial-gradient(at top left, ' + c1.rgb + ', ' + c2.rgb + ')';
}