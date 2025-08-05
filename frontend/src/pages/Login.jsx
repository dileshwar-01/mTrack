import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';


const Login = () => {
    const{navigate,backendUrl,token,setToken} = useContext(AppContext)
    const[currState,setCurrState] = useState('Login');
    const[name,setName]= useState('');
    const[password,setPassword]= useState('');
    const[email,setEmail]= useState('');

    const onsubmitHandler= async(e)=>{
      e.preventDefault();
      try {
        if(currState=='Sign Up'){
          const response = await axios.post(backendUrl+'/api/user/signup', {name,email,password});
          if(response.data.success){
            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token',token);
            navigate('/');
            toast.success("Successfully Created Account",{
            autoClose: 1000
          })
          }else{
            toast.error(response.data.message);
          }
        }else{
           const response = await axios.post(backendUrl+'/api/user/login', {email,password});
          if(response.data.success){
            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token',token);
            navigate('/');
            toast.success("Successfully Logged in",{
            autoClose: 1000
          })
          }else{
            toast.error(response.data.message);
          }
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    const handleGoogleLogin = async (credentialResponse) => {
     try {
       const tokenId = credentialResponse.credential;
       const res = await axios.post(`${backendUrl}/api/auth/google`, { token: tokenId });
   
       if (res.data.token) {
         setToken(res.data.token);
         localStorage.setItem('token', res.data.token);
         navigate('/');
         toast.success("Logged in with Google", { autoClose: 1000 });
       } else {
         toast.error("Google login failed");
       }
     } catch (error) {
       console.log(error);
       toast.error("Google login error");
     }
};

  return (
  <form onSubmit={onsubmitHandler} className='flex flex-col h-screen items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-900 '>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p className="text-4xl font-bold mb-6 text-center">{currState}</p>
    </div>

    {
      currState === "Login" ? '' :
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className='rounded-xl w-full px-3 py-2 border border-gray-800'
        placeholder='Name'
        required
      />
    }

    <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      className='rounded-xl w-full px-3 py-2 border border-gray-800'
      placeholder='Email'
      required
    />

    <input
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      className='rounded-xl w-full px-3 py-2 border border-gray-800'
      placeholder='Password'
      required
    />

    <div className='w-full flex justify-between text-sm mt-[-8px]'>
      <p className='cursor-pointer'>Forgot your password?</p>
      {
        currState === "Login" ?
        <p onClick={() => setCurrState('Sign Up')} className='cursor-pointer hover:text-blue-500'>Create account</p>
        :
        <p onClick={() => setCurrState('Login')} className='cursor-pointer hover:text-blue-500'>Login here</p>
      }
    </div>

    <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
      {currState === "Login" ? "Sign In" : "Sign Up"}
    </button>

    {/* OR divider */}
    <div className="my-1 flex items-center justify-center w-full">
      <div className="border-t w-full border-gray-300" />
      <span className="px-2 text-sm text-gray-600">or</span>
      <div className="border-t w-full border-gray-300" />
    </div>

    {/* Google login button */}
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => toast.error("Google Sign-in failed")}
    />
  </form>
);

}

export default Login;
