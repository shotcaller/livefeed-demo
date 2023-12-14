import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "./login/Login";
import Register from "./register/Register";

function Home() {
  const [page, setPage] = useState(0);
  const { online } = useSelector((state) => state.user);

  const handlePageChange = (e, newValue) => {
    setPage(newValue);
  };
  return (
    <>
      <Grid container spacing={1} sx={{mt: 2}}>
        <Grid item xs={0} md={6} lg={8}></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Container>
          <Box sx={{ backgroundColor: "background.paper" }}>
            <Tabs value={page} onChange={handlePageChange} centered textColor="primary">
              <Tab label="Log In" />
              <Tab label="Register" />
            </Tabs>
          </Box>
          {page === 0 ? <Login /> : <Register setPage={setPage} />}
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
