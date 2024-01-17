import { useDispatch } from "react-redux";
import { tokenStorageTitle } from "../constants/constants"
import { useNavigate } from "react-router-dom";
import { logout } from "../slice/userSlice";


export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return () => {
    localStorage.removeItem(tokenStorageTitle);
    dispatch(logout());
    navigate("/");
  }
}