import { Button } from "@mui/material";
import React from "react";

const Register = (props) => {
  const registerUser = () => {
    props.setPage(0);
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={registerUser}>
        Register
      </Button>
    </>
  );
};

export default Register;
