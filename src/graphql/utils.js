export const OPERATION_NAMES = {
  login: "Login",
  register: "Register",
  loggedInUser: "LoggedInUser"
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