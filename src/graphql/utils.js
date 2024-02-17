import axios from "axios";
import { serverGraphqlUrl, tokenStorageTitle } from "../constants/constants";

export const OPERATION_NAMES = {
  login: "Login",
  register: "Register",
  loggedInUser: "LoggedInUser",
  loggedInUserFriends: "LoggedInUserFriends"

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
      throw {request : {statusText: 'Unauthorized'}};

    const response = await axios.post(serverGraphqlUrl, createDataPayload(operationName, query, variables));
    if(response.data.errors || response.statusText!=='OK') throw response;
    
    return response.data.data;
  } catch (e) {
    //If token expired or not present or unauth req, logs out from Root
    if(e?.request?.statusText==='Unauthorized'){
      throw new Error('Unauthorized');
    }
    else
      throw new Error(e.data?.errors[0]?.message??"Some error occurred.");
  }
}