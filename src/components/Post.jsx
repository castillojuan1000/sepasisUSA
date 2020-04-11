import React, { useEffect, useRef, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';
import { firestore } from '../firebase'
import moment from 'moment';
import { UsersContext } from '../providers/UsersProvider'
import { Link } from 'react-router-dom'



//?Icons 
import IconButton from '@material-ui/core/IconButton';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import CommentSharpIcon from '@material-ui/icons/CommentSharp';
import ThumbDownSharpIcon from '@material-ui/icons/ThumbDownSharp';
import { blue, red } from '@material-ui/core/colors';


const deleteOnlyUser = (currentUser, postAuthor) => {
  if (!currentUser) return false;

  return currentUser.uid === postAuthor.uid;
}


export default function Post({ title, content, user, likes, dislikes, createdAt, comments, id, background }) {
  const classes = useStyles();
  const [commentsCount, setCommentsCount] = useState(0)


  const docRef = firestore.doc(`posts/${id}`)

  const deleteDoc = () => {
    docRef.delete()

    //?deleting subcollection 'comments' does not work well
    //? from the client side, i might need to create a server-side 
    // docRef.collection('comments').onSnapshot(snapshot => {
    //   snapshot.docs.map(doc => doc.delete())
    // })


  };


  const addLike = () => docRef.update({
    likes: likes + 1,
  })
  const addDislike = () => docRef.update({
    dislikes: dislikes + 1,
  })




  useEffect(() => {
    const unsubscribeFromFirestore = docRef.collection('comments').onSnapshot(snapshot => {
      const comments = snapshot.docs;
      setCommentsCount(comments.length)
    })
    return () => {
      unsubscribeFromFirestore();
    }
  }, [docRef])




  //******************************************************************* */
  //? Deleting post after  twoWeeks(time managed in milleseconds)
  const now = createdAt.seconds * 1000;
  // const monthInMilliseconds = 2628000000;
  const week2InMilliseconds = 1210000000;
  const then = now + week2InMilliseconds;
  const timeLeft = then - Date.now();

  //?custom hook
  useInterval(() => {
    docRef.delete();
  }, timeLeft);
  //?*********************************************************************




  //todo: capitalizing!!
  const capitalizeTitle = title ? title.charAt(0).toUpperCase() + title.slice(1) : '';
  const capitalizeUser = user.displayName ? (user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)) : ('');
  const capitalizeContent = content ? content.charAt(0).toUpperCase() + content.slice(1) : '';
  const profilePic = user.photoURL ? user.photoURL : null;






  const currentUser = useContext(UsersContext)




  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ background: `${background}` }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center" spacing={2}>

          <Grid item style={{ padding: 0 }}>
            <Link to='/profile'>

              <ButtonBase className={classes.image}>
                <Avatar alt="Remy Sharp" src={profilePic} className={classes.avatar} />
              </ButtonBase>
            </Link>
          </Grid>


          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" justify="center"
              alignItems="center" spacing={2}>
              <Grid item xs style={{ paddingTop: 0, paddingBottom: 0 }}>
                <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <Typography variant="button" display="block" gutterBottom className={classes.typography} style={{ color: 'white' }} >
                    {capitalizeTitle}
                  </Typography>
                </Link>
                <Typography variant="body2" gutterBottom className={classes.typography}>
                  {capitalizeContent}
                </Typography>

                <div className={classes.nameAndTime}>

                  <p style={{ margin: 0 }}>Posted by <span style={{ color: 'white' }} >
                    {capitalizeUser}</span>
                  </p>
                  <p style={{ color: 'white', margin: 0 }}>{moment(createdAt.toDate()).calendar()}</p>
                </div>

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
                  <Link to={`/posts/${id}`} style={{ textDecoration: 'none' }}>

                    <IconButton>
                      <CommentSharpIcon style={{ color: blue[500] }} />
                    </IconButton>
                  </Link>
                  <span style={{ color: 'rgb(32,155,229)' }}>{commentsCount}</span>
                </Grid>


                {
                  deleteOnlyUser(currentUser, user) &&
                  <Grid item>
                    <IconButton
                      onClick={deleteDoc}>
                      <DeleteForeverSharpIcon style={{ color: red[500] }} />
                    </IconButton>
                  </Grid>
                }


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
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: "85%",
    marginBottom: theme.spacing(2),
    overflow: 'auto'

  },
  typography: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
      padding: 0,
    },
  },
  image: {
    width: 128,
    height: 128,
  },
  avatar: {
    margin: '0 auto',
    display: 'block',
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  nameAndTime: {
    marginTop: '1rem',
    marginBottom: '1.2rem'
  }
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