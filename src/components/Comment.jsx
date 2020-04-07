import React, { Fragment } from 'react';
import moment from 'moment';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';



const Comment = ({ content, user, createdAt }) => {
  const capitalizeUser = user.displayName ? (user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)) : ('');

  return (
    <Fragment >

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`${user.photoURL}`} />
        </ListItemAvatar>
        <ListItemText
          primary={capitalizeUser}
          secondary={
            <React.Fragment>

              {` — ${content}`}
              <br />
              <span style={{ color: '#7CB341' }}>
                {moment(createdAt).calendar()}
              </span>
            </React.Fragment>
          }

        />

      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>

  );
};



export default Comment;

