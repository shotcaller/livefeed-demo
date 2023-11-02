import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = () => {
    dispatch(login({ name: "Ruturaj" }));
    navigate("/wall");
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={loginUser}>
        Log In
      </Button>
    </>
  );
};

export default Login;
