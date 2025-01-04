import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Box,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { login } from "../../../slice/userSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { loginFailure, loginSuccess, tokenStorageTitle } from "../../../constants/constants";
import { OPERATION_NAMES, callGraphqlServer } from "../../../graphql/utils";
import { LOGIN_QUERY } from "../../../graphql/query/user";
import Loader from "../../../components/Loader/Loader";
import { openAlert } from "../../../slice/alertPopupSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const useridErrorMsg = "User ID is required";
  const passwordErrorMsg = "Password is required";

  const loginUser = async (formData) => {
    navigation.state = 'loading';
    try{
      const response = await callGraphqlServer(
          OPERATION_NAMES.login,
          LOGIN_QUERY,
          {
            loginPayload:{
              userid: formData.userid,
              password: formData.password
            }
          }
        )
        
      const data = response.login;
      if(data.success && data.token.split('.').length==3){
        localStorage.setItem(tokenStorageTitle,data.token);
        axios.defaults.headers.common["Authorization"] = "Bearer "+ data.token;
        dispatch(login(data.user));
        dispatch(openAlert({ message: loginSuccess, type: 'success' }));
        navigation.state = 'idle';
        navigate("/wall");
      }
      else throw Error("Error while logging in.")
    } catch (error) {
      navigation.state = 'idle';
      dispatch(openAlert({ message: `${loginFailure} ${error.message}`, type: 'error' }));
      console.error(error);
    }
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
                  type="password"
                  margin="normal"
                  error={errors.userid ? true : false}
                  variant="outlined"
                  label="User ID"
                  id="userid"
                  {...register("userid", { required: useridErrorMsg })}
                  helperText={errors.userid ? errors.userid.message : ""}
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
                <Button disabled={navigation.state==='loading'} variant="contained" color="primary" type="submit">
                  Log In
                </Button>
              </CardActions>
            </Paper>
          </form>
        </Card>
      </Box>
      <Loader open={navigation.state==='loading'} />
    </>
  );
};

export default Login;
