import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import PostsProvider from './providers/PostsProvider'
import UsersProvider from './providers/UsersProvider'



ReactDOM.render(
  <Suspense fallback={<h1>loading page...</h1>}>

    <Router>
      <PostsProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </PostsProvider>
    </Router>
  </Suspense>
  ,
  document.getElementById('root')
);

