import React from 'react';
import Welcome from './Welcome'
// import Authentication from './Authentication'
import Posts from './Posts';
import Authentication from './Authentication'
import { Switch, Route, Link } from 'react-router-dom'
import UserProfile from './UserProfile';
import PostPage from './PostPage'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Navbar from './NavBar'
import Container from '@material-ui/core/Container'



function App() {
  return (
    <Container maxWidth="md">

      {/* <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />

      </Switch> */}
      <Navbar />
      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/posts/:id' component={PostPage} />
      </Switch>

    </Container>
  );
}


export default App;
