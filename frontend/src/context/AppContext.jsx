import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const navigate = useNavigate();
    const backendUrl=  import.meta.env.VITE_BACKEND_URL;
    const [token,setToken]= useState('')

       useEffect(()=>{
          if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
          }  
        },[])

    const value = {
        navigate,
        backendUrl,
        token
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    ) 
}

export default AppContextProvider;