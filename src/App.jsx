import "./App.css";
import MyAppBar from "./components/MyAppBar/MyAppBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <MyAppBar />
      <Outlet />
    </>
  );
}

export default App;
