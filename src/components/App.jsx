import React, { useContext } from 'react';
import Container from '@material-ui/core/Container'
import UserIsAuth from './UserIsAuth';
import UserIsNotAuth from './UserIsNotAuth'
import { UsersContext } from '../providers/UsersProvider'




function App() {
  const user = useContext(UsersContext);

  return (
    <Container maxWidth="md">
      {user ? <UserIsAuth /> : <UserIsNotAuth />}
    </Container>
  );
}


export default App;
