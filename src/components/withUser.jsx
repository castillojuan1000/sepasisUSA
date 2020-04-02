import React from 'react';
import { UsersContext } from '../providers/UsersProvider';

//? this is optional but it will be helpful when you come back to you code later
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.getDisplayName || WrappedComponent.name || ''
}

const withUser = Component => {
  const WrappedComponent = props => {
    return (
      <UsersContext.Consumer>
        {
          user => <Component user={user} {...props} />
        }
      </UsersContext.Consumer>
    )
  }
  //? this is optional but it will be helpful when you come back to you code later
  WrappedComponent.displayName = `withUser(${getDisplayName(WrappedComponent)})`

  return WrappedComponent;
}

export default withUser;