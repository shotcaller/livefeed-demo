import axios from "axios";
import { UNAUTHORIZED, serverGraphqlUrl, tokenStorageTitle } from "../constants/constants";
import { ALL_USERS_QUERY } from "./query/user";

export const OPERATION_NAMES = {
  login: "Login",
  register: "Register",
  loggedInUser: "LoggedInUser",
  loggedInUserFriends: "LoggedInUserFriends",
  allUsers: "AllUsers",
  addFriend: "AddFriend"
};

export const createDataPayload = (operationName, query, variables=null) => {
  if(!variables){
    return {
      operationName,
      query
    }
  }
  else {
    return {
      operationName,
      query,
      variables
    }
  }
}

export const callGraphqlServer = async (operationName, query, variables=null) => {
  try {
    const token = localStorage.getItem(tokenStorageTitle);
    if(!token && (operationName!==OPERATION_NAMES.login && operationName!==OPERATION_NAMES.register)) 
      throw {response : {status: 401}};

    const response = await axios.post(serverGraphqlUrl, createDataPayload(operationName, query, variables));
    if(response.data.errors || (response.status<200 || response.status>299)) throw response;
    
    return response.data.data;
  } catch (e) {
    //If token expired or not present or unauth req, logs out from Root
    if(e?.response?.status===401){
      throw new Error(UNAUTHORIZED);
    }
    else
      throw new Error(e.data?.errors[0]?.message??"Some error occurred.");
  }
}

//** Function to get all Users */
export const getAllUsers = async () =>{
  try {
      const response = await callGraphqlServer(
        OPERATION_NAMES.allUsers,
        ALL_USERS_QUERY
      );
      if (!response.users) throw new Error("Error while fetching users.");

      return response.users;
  } catch (e) {
    console.error(e);
  }
}