import React from 'react'
import Comment from './Comment';
import AddComment from './AddComment';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const Comments = ({ comments, onCreate }) => {

  const classes = useStyles();

  const sortedComments = comments.sort((a, b) => {
    return b.createdAt.seconds - a.createdAt.seconds;
  })

  return (
    <section className="Comments">
      <AddComment onCreate={onCreate} />
      {sortedComments.map(comment => (
        <List className={classes.root} key={comment.id}>

          <Comment {...comment} />
        </List>
      ))}
    </section>
  )
}

export default Comments;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '60ch',
    backgroundColor: theme.palette.background.paper,
  }
}));