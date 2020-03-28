import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from "react-router-dom";
import PostsProvider from './providers/PostsProvider'



ReactDOM.render(

  <Router>
    <PostsProvider>

      <App />
    </PostsProvider>
  </Router>
  ,
  document.getElementById('root')
);

