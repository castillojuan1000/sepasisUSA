import React, { Component } from 'react';
import Post from './Post'
import Comments from './Comments'
import { firestore } from '../firebase'
import { collectIdAndDocs } from '../utilities';
import { withRouter } from 'react-router-dom'
import withUser from './withUser'


class PostPage extends Component {
  state = { post: null, comments: [] }

  //? this will the the id of the post with the help of WithRouter wrap around the component 
  get postId() {
    return this.props.match.params.id;
  }

  //? we are getting the reference of that particular post 
  get postRef() {
    return firestore.doc(`/posts/${this.postId}`)
  }

  get commentsRef() {
    return this.postRef.collection('comments')
  }

  unsubscribeFromPost = null;
  unsubscribeFromComments = null;

  componentDidMount = async () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
      const post = collectIdAndDocs(snapshot)
      this.setState({ post: post })
    })

    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
      const comments = snapshot.docs.map(collectIdAndDocs)
      this.setState({ comments: comments })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  }

  createComment = (comment) => {
    const { user } = this.props;
    this.commentsRef.add({
      ...comment,
      user
    })
  }

  render() {
    const { comments, post } = this.state;
    return (
      <section>
        {
          post && <Post {...post} />
        }
        <Comments
          comments={comments}
          // postId={post.id}
          onCreate={this.createComment}
        />
      </section>
    )
  }

}

export default withRouter(withUser(PostPage))