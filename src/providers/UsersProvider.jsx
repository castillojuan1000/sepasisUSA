import React, { Component, createContext } from 'react';
import { auth } from '../firebase'
import { createUserProfileDocument } from '../firebase';
import { withRouter } from 'react-router-dom'

export const UsersContext = createContext();

class UsersProvider extends Component {
  state = { user: null }
  unsubscribeFromAuth = null;

  componentDidMount = async () => {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } })
        })
      }
      this.setState({ user: userAuth })
      this.props.history.push('/')

    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };


  render() {

    const { user } = this.state;
    const { children } = this.props;

    return (
      <UsersContext.Provider value={user}>
        {children}
      </UsersContext.Provider>
    )
  }
}

export default withRouter(UsersProvider);