import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { serverGraphqlUrl } from "../../../constants/constants";
import { OPERATION_NAMES, createDataPayload } from "../../../graphql/utils";
import { REGISTER_QUERY } from "../../../graphql/query/user";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nameErrorMsg = "Name is required";
  const useridErrorMsg = "User ID is required";
  const passwordErrorMsg = "Password is required";


  const registerUser = async (formData) => {
    try {
      const response = await axios.post(serverGraphqlUrl,
        createDataPayload(
          OPERATION_NAMES.register,
          REGISTER_QUERY,
          {
            registerPayload: {
              userid: formData.userid,
              name: formData.name,
              password: formData.password
            }
          }))

      if(response.data.errors) throw Error("Error while registration.");

      const data = response.data.data.register;
      if(data.success && data.user.userid){
        props.setPage(0);
      } else throw Error("Error while registration.")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Box>
        <Card>
          <form onSubmit={handleSubmit(registerUser)}>
            <Paper elevation={3}>
              <CardContent>
                <TextField
                  fullWidth
                  margin="normal"
                  error={errors.name ? true : false}
                  variant="outlined"
                  label="Name"
                  id="name"
                  {...register("name", { required: nameErrorMsg })}
                  helperText={errors.name ? errors.name.message : ""}
                />

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
                <Button variant="contained" color="secondary" type="submit">
                  Register
                </Button>
              </CardActions>
            </Paper>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default Register;
