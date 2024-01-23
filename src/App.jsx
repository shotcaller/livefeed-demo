import { Box, ThemeProvider } from "@mui/material";
import "./App.css";
import MyAppBar from "./components/MyAppBar/MyAppBar";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { darkTheme } from './theme/darkTheme';
import AlertPopup from "./components/AlertPopup/AlertPopup";

function App() {
  const location = useLocation()
  const { online } = useSelector((state) => state.user);
  const [showNavigation, setShowNavigation] = useState(false);
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    if(online && location.pathname!=="/room")
      setShowNavigation(true)
    else
      setShowNavigation(false)
  },[online, location.pathname])

  return (
    <>
      <ThemeProvider theme={darkMode?darkTheme:{}}>
      <MyAppBar showLogout={showNavigation} />
      <Box sx={{ pb: showNavigation?7:0 }}>
        <Outlet />
        {showNavigation && <Navigation />}
      </Box>
      <AlertPopup />
      </ThemeProvider>
    </>
  );
}

export default App;
