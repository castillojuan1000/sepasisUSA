import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome'

export default function UserIsAuth() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />

      </Switch>
    </>
  )
}