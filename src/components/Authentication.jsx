//Todo: this is where im having signIn and singUp options for more help refer to codeSandbox example
import React, { useContext } from "react";
import SignIn from './SignIn'
import SignUp from "./SignUp";
import CurrentUser from './CurrentUser/CurrentUser'
import { UsersContext } from '../providers/UsersProvider'



//todo: add logic to where it will show the signIn  component 

export default function Authentication() {
  const user = useContext(UsersContext);
  return <div>{user ? <CurrentUser  {...user} /> : <SignIn />}</div>
}


