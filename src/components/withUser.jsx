import React from 'react';
import { UsersContext } from '../providers/UsersProvider';


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
  WrappedComponent.displayName = `withUser(${getDisplayName(WrappedComponent)})`

  return WrappedComponent;
}

export default withUser;