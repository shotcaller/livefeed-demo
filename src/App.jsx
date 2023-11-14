import { Box } from "@mui/material";
import "./App.css";
import MyAppBar from "./components/MyAppBar/MyAppBar";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useSelector } from "react-redux";

function App() {
  const { online } = useSelector((state) => state.user);

  return (
    <>
      <MyAppBar />
      <Box sx={{ pb: online?7:0 }}>
        <Outlet />
        {online && <Navigation />}
      </Box>
    </>
  );
}

export default App;
