import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [memberships, setMemberships] = useState([]);
  const [user, setUser] = useState(
      localStorage.getItem("username") || {}
  );
  

  useEffect(() => {
    console.log(localStorage.getItem("username"));
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      if (user?.name) {
      localStorage.setItem("username", user.name); 
    }
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }

  }, [token,user]);

  const value = {
    navigate,
    backendUrl,
    setUser,
    user,
    token,
    setToken,
    memberships,
    setMemberships,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
