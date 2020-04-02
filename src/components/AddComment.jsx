import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import moment from 'moment'



export default function AddComment({ onCreate }) {
  const classes = useStyles();


  const [state, setState] = useState({ content: '', createdAt: moment(new Date()).calendar() });


  const handleChange = event => {
    const { name, value } = event.target;
    setState({ [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const createdAt = moment(new Date()).calendar()
    console.log(createdAt)

    onCreate(state)
    setState({ content: '' });
  };


  console.log(state)
  const { content } = state;
  return (
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

              label="Comment"
              style={{ margin: 8 }}
              placeholder="comment"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={content}
              name="content"
              onChange={handleChange}
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

    </form>
  );

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

