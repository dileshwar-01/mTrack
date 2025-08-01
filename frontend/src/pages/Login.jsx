import React, { useState } from 'react'


const Login = () => {
    const[currState,setCurrState] = useState('Login');
    const[name,setName]= useState('');
    const[password,setPassword]= useState('');
    const[email,setEmail]= useState('');

    

  return (
<form  className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-900 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className="text-4xl font-bold mb-6 text-center">{currState}</p>
      </div>
      {
        currState=== "Login"? ''
        :<input type="text" onChange={(e)=>setName(e.target.value)} value={name} className='rounded-xl w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
      }
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-xl w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-xl w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px] '>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currState === "Login"?
            <p onClick={()=>setCurrState('Sign Up')} className='cursor-pointer hover:text-blue-500'>Create account</p>
          : <p onClick={()=>setCurrState('Login')} className='cursor-pointer hover:text-blue-500'>Login here</p>
        }
      </div>
      <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">{currState === "Login" ? "Sign In" : "Sign Up"}</button>
    </form>
  )
}

export default Login;
