import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import App from './App'
import { serverGraphqlUrl, tokenStorageTitle } from './constants/constants'
import axios from 'axios'
import { OPERATION_NAMES, createDataPayload } from './graphql/utils'
import { LOGGED_IN_USER_QUERY } from './graphql/query/user'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { login } from './slice/userSlice'
import { useLogout } from './hooks/useLogout'

function Root() {
  const { loggedInUser } = useLoaderData();
  const dispatch = useDispatch();
  const logout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(loggedInUser){
      dispatch(login(loggedInUser));
      if(location.pathname === '/') navigate("/wall");
    } else {
      logout();
    }
  },[loggedInUser])

  return (
    <App />
  )
}

export default Root

export const loader = async () => {
  const token = localStorage.getItem(tokenStorageTitle);
  if(!token){
    delete axios.defaults.headers.common["Authorization"];
    return { loggedInUser: null }
  }
  else {
    try{
      axios.defaults.headers.common["Authorization"] = "Bearer "+ token;
      const response = await axios.post(serverGraphqlUrl, 
        createDataPayload(
          OPERATION_NAMES.loggedInUser,
          LOGGED_IN_USER_QUERY))
  
      if(response.data.errors) throw Error("Error while logging in.");

      const data = response.data.data.loggedInUser;
      if(data){
        return { loggedInUser: data }
      }
      else throw Error("No response from server.");
  
    } catch (e) {
      console.log(e);
      delete axios.defaults.headers.common["Authorization"];
      return { loggedInUser: null };
    }
  }
}