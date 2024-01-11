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
import { useNavigate } from "react-router-dom";
import { login } from "../../../slice/userSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverGraphqlUrl } from "../../../constants/constants";
import { OPERATION_NAMES, createDataPayload } from "../../../graphql/utils";
import { LOGIN_QUERY } from "../../../graphql/query/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const useridErrorMsg = "User ID is required";
  const passwordErrorMsg = "Password is required";

  const loginUser = async (formData) => {
    try{
      const response = await axios.post(serverGraphqlUrl, 
        createDataPayload(
          OPERATION_NAMES.login,
          LOGIN_QUERY,
          {
            loginPayload:{
              userid: formData.userid,
              password: formData.password
            }
          }
        ))
        
      if(response.data.errors) throw Error("Error while logging in.");

      const data = response.data.data.login;
      if(data.success && data.token.split('.').length==3){
        const {id, name, userid } = data.user;
        dispatch(login({ id, name, userid }));
        navigate("/wall");
      }
      else throw Error("Error while logging in.")
    } catch (error) {
      console.log(error);
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
