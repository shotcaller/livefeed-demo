import axios from "axios";
import { serverGraphqlUrl } from "../constants/constants";

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
    const response = await axios.post(serverGraphqlUrl, createDataPayload(operationName, query, variables));

    if(response.data.errors) throw Error(response.data.errors[0].message??"Some error occurred.");

    return response.data.data;
  } catch (e) {
    throw e;
  }
}