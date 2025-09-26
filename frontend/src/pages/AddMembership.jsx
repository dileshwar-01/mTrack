import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddMembership = () => {

  const {token,backendUrl,navigate} = useContext(AppContext);
  const[name,setName]= useState('');
  const[type,setType]= useState('');
  const[startDate,setStartDate] = useState('');
  const[endDate,setEndDate] =useState('');
  const[skipCounter,setSkipCounter] = useState(false);
  const[price,setPrice] = useState('')
  const[loading,setLoading] = useState(false)

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      if(token){
      const response = await axios.post(backendUrl+'/api/mem/add' , {name,type,startDate,endDate,price,skipCounter}, {headers:{token}});
      if(response.data.success){
        toast.success("Added membership successfully",{
            autoClose: 1000
          })
        navigate('/dashboard')
      }else{
        toast.error(response.data.message);
      }
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return !loading ? (
    <div className="px-4 h-screen -mt-14 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6 text-center">
          Add Your Membership 
        </h2>
      {
        token?
        ( <div className="w-full max-w-md  bg-white p-8 rounded-lg shadow-md">

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <input
            className="border px-3 py-2 rounded-md w-full"
            type="text"
            name="membershipName"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            placeholder="Enter membership name"
          />
          <input
            className="border px-3 py-2 rounded-md w-full"
            type="text"
            name="membershipType"
            onChange={(e)=>setType(e.target.value)}
            value={type}
            placeholder="Enter membership type"
          />

          <input
            className="border px-3 py-2 rounded-md w-full"
            type="text"
            name="price"
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            placeholder="Enter membership price"
          />

          <div className="flex flex-col">
            <label htmlFor="startDate" className="mb-1 text-sm text-gray-600">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={(e)=>setStartDate(e.target.value)}
              value={startDate}
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="endDate" className="mb-1 text-sm text-gray-600">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={(e)=>setEndDate(e.target.value)}
              value={endDate}
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>
          <div className='flex items-center gap-4 text-gray-800'>
            <input type="checkbox" name="" id="" onChange={()=>setSkipCounter(!skipCounter)} />
            <p>Add skips feature for this membership</p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Membership
          </button>
        </form>
      </div>
      )
        : (<p className='text-lg text-gray-600'> Please login to get started...</p>)
      }
    </div>
  ) :(
    <div className='mx-auto h-screen flex items-center justify-center'>
      <p className='text-lg text-gray-600'>Adding membership, please wait...</p>
    </div>
  )
};


export default AddMembership
