export const OPERATION_NAMES = {
  login: "Login",
  register: "Register"
};

export const createDataPayload = (operationName, query, variables=null) => {
  if(!variables){
    {
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