import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ProfilePic from '../photos/welcome.jpg'
import Avatar from '@material-ui/core/Avatar';

export default function Post() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar alt="Remy Sharp" src={ProfilePic} className={classes.avatar} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Random text generator
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Delightful remarkably mr on announcing themselves entreaties favourable. About to in so terms voice at. Equal an would is found seems of. The particular friendship one sufficient terminated frequently themselves. It more shed went up is roof if loud case. Delay music in lived noise an. Beyond genius really enough passed is up.
                </Typography>

              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>

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
    marginBottom: theme.spacing(3)
  },
  image: {
    width: 128,
    height: 128,
  },
  avatar: {
    margin: 'auto',
    display: 'block',
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}));