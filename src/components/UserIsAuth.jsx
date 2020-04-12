import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import PostPage from './PostPage'
import Navbar from './NavBar'
import Posts from './Posts'

export default function UserIsAuth() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={UserProfile} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/posts/:id' component={PostPage} />
      </Switch>
    </>
  )
}