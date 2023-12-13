import { Button, Card, CardActions, CardContent, Paper, Box, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../slice/userSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const usernameErrorMsg = "Username is required";
  const passwordErrorMsg = "Password is required";

  const loginUser = () => {
    dispatch(login({ name: "Ruturaj" }));
    navigate("/wall");
  };
  return (
    <>
      <Box>
        <Card>
          <form onSubmit={handleSubmit(loginUser)}>
            <Paper elevation={3}>
              <CardContent>
                <TextField
                  fullWidth
                  margin="normal"
                  error={errors.username ? true : false}
                  variant="outlined"
                  label="Username"
                  id="username"
                  {...register("username", { required: usernameErrorMsg })}
                  helperText={errors.username ? errors.username.message : ""}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  error={errors.password ? true : false}
                  variant="outlined"
                  label="Password"
                  id="password"
                  {...register("password", { required: passwordErrorMsg })}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" type="submit">
                  Log In
                </Button>
              </CardActions>
            </Paper>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default Login;
