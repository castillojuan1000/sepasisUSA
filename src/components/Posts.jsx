import React, { Fragment } from 'react';
import AddPost from './AddPost';
import Post from './Post';

export default function Posts() {
  return (
    <Fragment>
      <AddPost />
      <Post />
      <Post />
    </Fragment>
  )
}
