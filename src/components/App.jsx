import React from 'react';
// import Welcome from './Welcome'
// import Authentication from './Authentication'
import Posts from './Posts';
import Authentication from './Authentication'
import { Switch, Route, Link } from 'react-router-dom'
import UserProfile from './UserProfile';
import PostPage from './PostPage'



function App() {
  return (
    <div className="app">
      <Link to='/'><h1>Home</h1></Link>
      <Authentication />
      <Switch>
        <Route exact path='/' component={Posts} />
        <Route exact path='/profile' component={UserProfile} />
        <Route exact path='/posts/:id' component={PostPage} />
      </Switch>

    </div>
  );
}


export default App;
