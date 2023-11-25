import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Paper, Switch, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigateQueryParams } from "../../hooks/useNavigateQueryParams";

export const QuickRoomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigateQueryParams = useNavigateQueryParams();
  const roomErrorMsg = "Room name is required";
  const userErrorMsg = "User name is required";

  const onSubmit = (data) => {
    console.log(data);
    navigateQueryParams('/room', {roomname: data.roomName, username: data.userName})
  };
  return (
    <>
      <Box>
        <Card variant="outlined">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper elevation={3}>
            <CardContent>
              <Typography variant="h5" component="div">
                Create A Room
              </Typography>
              <TextField
                error={errors.roomName ? true : false}
                variant="outlined"
                label="Room Name"
                id="roomName"
                {...register("roomName", { required: roomErrorMsg })}
                helperText={errors.roomName ? errors.roomName.message : ""}
              />
              <TextField
                error={errors.userName ? true : false}
                variant="outlined"
                label="User Name"
                id="userName"
                {...register("userName", { required: userErrorMsg })}
                helperText={errors.userName ? errors.userName.message : ""}
              />
              <FormControlLabel control={<Switch />} {...register("useVideo")} label="Use Video?"/>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" color="success">
                Create
              </Button>
            </CardActions>
            </Paper>
          </form>
        </Card>
      </Box>
    </>
  );
};
