import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome'

export default function UserIsAuth() {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />

      </Switch>
    </Fragment>
  )
}