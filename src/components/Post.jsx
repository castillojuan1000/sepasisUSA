import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ProfilePic from '../photos/welcome.jpg'
import Avatar from '@material-ui/core/Avatar';
import { firestore } from '../firebase'
import moment from 'moment';

//?Icons 
import IconButton from '@material-ui/core/IconButton';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import CommentSharpIcon from '@material-ui/icons/CommentSharp';
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp';
import { blue, red } from '@material-ui/core/colors';

export default function Post({ title, content, user, likes, dislikes, createdAt, comments, id, background }) {
  const classes = useStyles();


  const docRef = firestore.doc(`posts/${id}`)
  const deleteDoc = () => docRef.delete();
  const addLike = () => docRef.update({
    likes: likes + 1,
  })
  const addDislike = () => docRef.update({
    dislikes: dislikes + 1,
  })

  //******************************************************************* */
  //? Deleting post after a month(time managed in milleseconds)
  // const now = createdAt.seconds * 1000;
  // const monthFromNow = 2628000000;
  // const then = now + monthFromNow;
  // const timeLeft = then - Date.now();

  //?custom hook
  // useInterval(() => {
  //   docRef.delete();
  // }, timeLeft);
  //?*********************************************************************




  //todo: capitalizing!!
  const capitalizeTitle = title.charAt(0).toUpperCase() + title.slice(1)
  const capitalizeUser = user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)
  const capitalizeContent = content.charAt(0).toUpperCase() + content.slice(1)



  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ background: `${background}` }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center" spacing={2}>

          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar alt="Remy Sharp" src={ProfilePic} className={classes.avatar} />
            </ButtonBase>
          </Grid>


          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" justify="center"
              alignItems="center" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {capitalizeTitle}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {capitalizeContent}
                </Typography>
                <br />
                <p>Posted by <span style={{ color: '#7CB341' }}>
                  {capitalizeUser}</span>
                </p>
                <p style={{ color: '#7CB341' }}>{moment(createdAt.toDate()).calendar()}</p>

              </Grid>
              <Grid item xs container direction="row" justify="center"
                alignItems="center" spacing={1}>

                <Grid item>
                  <IconButton onClick={addLike}>
                    <FavoriteSharpIcon style={{ color: blue[500] }} />
                  </IconButton>
                  <span style={{ color: 'rgb(32,155,229)' }}>{likes}</span>
                </Grid>

                <Grid item>
                  <IconButton onClick={addDislike}>
                    <ThumbDownSharpIcon style={{ color: blue[500] }} />
                  </IconButton>
                  <span style={{ color: 'rgb(32,155,229)' }}>{dislikes}</span>
                </Grid>

                <Grid item>
                  <IconButton>
                    <CommentSharpIcon style={{ color: blue[500] }} />
                  </IconButton>
                  <span style={{ color: 'rgb(32,155,229)' }}>{comments}</span>
                </Grid>



                <Grid item>
                  <IconButton
                    onClick={deleteDoc}>
                    <DeleteForeverSharpIcon style={{ color: red[500] }} />
                  </IconButton>
                </Grid>

              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "80%",
    marginBottom: theme.spacing(2),

  },
  image: {
    width: 128,
    height: 128,
  },
  avatar: {
    margin: 'auto',
    display: 'block',
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));


//? SetInterVal to delete post after a month? 
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}