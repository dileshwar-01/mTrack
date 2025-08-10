import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const navigate = useNavigate();
    const backendUrl=  import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [memberships,setMemberships] = useState([]);


        

    useEffect(()=>{
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }    
    },[token])

    const value = {
        navigate,
        backendUrl,
        token,setToken,
        memberships,setMemberships,
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    ) 
}

export default AppContextProvider;