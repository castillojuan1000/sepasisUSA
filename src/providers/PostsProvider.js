import React, { createContext, Component } from 'react';
import { firestore } from '../firebase';
import { collectIdAndDocs } from '../utilities';

export const PostsContext = createContext();

class PostsProvider extends Component {
  state = { posts: [] }

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdAndDocs);
        this.setState({ posts });
      });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { posts } = this.state;
    const { children } = this.props;
    return (
      <PostsContext.Provider value={posts}>
        {children}
      </PostsContext.Provider>
    )
  }
}

export default PostsProvider;