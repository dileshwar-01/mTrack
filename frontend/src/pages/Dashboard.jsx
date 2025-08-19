import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import  axios  from "axios";

const Dashboard = () => {
  const{token,backendUrl,memberships,setMemberships} = useContext(AppContext)
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nameEdit,setNameEdit] = useState('')
  const [endDateEdit,setendDateEdit] = useState('')
  const[expiredMems,setExpiredMems] = useState([]);
  const[activeMems,setActiveMems] = useState([])
  const[filter, setFilter] = useState('All');
  const[showMem, setShowMem] = useState(memberships);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }); 

  const listMems =async()=>{
          try {
              if(token){
                  const response =await axios.post(backendUrl+'/api/mem/get' , {}, {headers:{token}});
                  if(response.data.success){
                    setMemberships(response.data.memberships);
                  }
                  else{
                    toast.error(response.data.message);
                  }
              }else{
                setMemberships([])
              }
          } catch (error) {
              console.log(error.message);
              toast.error(error.message)
          }
   }

    const removeMem= async(memId)=>{
    try {
      if(token){
        const response = await axios.post(backendUrl+'/api/mem/remove', {memId}, {headers:{token}})
        if(response.data.success){
          listMems();
          toast.success("Membership removed successfully",{
            autoClose: 1000
          })
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  
  const updateSkips= async(memId,newSkips)=>{
    try {
      const response = await axios.post(backendUrl+'/api/mem/skip' , {memId,newSkips}, {headers:{token}});
      if(response.data.success){
        listMems();
        if(newSkips===0){
          toast.success("Resetted skips",{
            autoClose: 1000
          })
        }else{
          toast.success("Skipped today!",{
            autoClose: 1000
          })
        }
       
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
     listMems();
     
  },[setMemberships,token])
  
  useEffect(() => {
  if (memberships && memberships.length > 0) {
    const active = [];
    const exp = [];
    for (const membership of memberships) {
      const today = new Date();
      const end = new Date(membership.endDate);
      const isActive = today <= end;
      if (isActive) {
        active.push(membership);
      } else {
        exp.push(membership);
      }
    }
    setActiveMems(active);
    setExpiredMems(exp);
  }
}, [memberships]);




  const openEditModal = (membership) => {
    
    setSelected(membership);
    setIsOpen(true);
  };

  const saveChanges =async (nameEdit,endDateEdit) => {
   try {
    let memId= selected._id;
    const response = await axios.post(backendUrl+'/api/mem/update', {memId,name :nameEdit,endDate: endDateEdit}, {headers:{token}})
    if(response.data.success){
      listMems();
      toast.success("Information updated successfully")
      setNameEdit('')
      setendDateEdit('')

    }
    setIsOpen(false);
   } catch (error) {
    
   }

  };

  const getProgress = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
    
      const total = end - start;
      const used = today - start;
    
      if (today < start) return 0;
      if (today > end) return 100;
    
      return Math.round((used / total) * 100);
};

  const getDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // convert ms to days
    return diffDays > 0 ? diffDays : 0; // don't show negative
};

  
useEffect(()=>{
  if(filter=='All'){
   setShowMem(memberships)
  }else if(filter==='Active'){
    setShowMem(activeMems)
  }else{
    setShowMem(expiredMems);
  }
},[filter, memberships, activeMems, expiredMems])

  return (
    <div className="p-6 min-h-screen ">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Memberships</h2>
      <div className="flex items-center justify-between">
      <select   className="m-4 px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none " onChange={(e)=>setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Expired">Expired</option>
      </select>

      <p className="text-base  text-gray-700">Today: {formattedDate}</p>
      </div>

      


{
  showMem.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {showMem.map((membership) => {
        const today = new Date();
        const end = new Date(membership.endDate);
        const isActive = today <= end;

        return (
          <div
            key={membership._id}
            className="bg-white p-5 rounded-lg shadow shadow-blue-200 border-gray-300 border relative"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{membership.name}</h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isActive ? "Active" : "Expired"}
              </span>
            </div>
            <p className="text-sm text-gray-500 capitalize">
              {membership.type} 
            </p>
            <p className="text-gray-800 text-sm">Price: ₹<span className="font-medium">{membership.price}</span></p>
            <p className="text-gray-800 text-sm">Started on: <span className="font-medium">{new Date(membership.startDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })} </span> </p>
           
            <div className="flex justify-between">
                 <p className="text-gray-800 text-sm">
                 {
                  isActive? " Ending on: "
                  :"Ended on: "
                 }
                   <span className="font-medium">{new Date(membership.endDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })} </span> </p>
                {
                 membership.skipCounter?
                <p className="text-sm">Skips: <span className="font-medium">{membership.skips} </span></p>   
                 :null
                }
            </div>
            <div className="flex justify-between">
               <p className="text-gray-800 text-sm">Days Left: <span className="font-medium">{getDaysLeft(membership.endDate)} </span> </p>
                {
                 membership.skipCounter && isActive?
                <button onClick={()=>updateSkips(membership._id,0)} className="text-gray-800 text-sm  cursor-pointer hover:underline">Reset skips</button>   
                 :null
                }
            </div>
           
            
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${getProgress(membership.startDate, membership.endDate)}%` }}
                  ></div>
           </div>
            <p className="text-xs text-gray-500 mt-1">
              Progress: {getProgress(membership.startDate, membership.endDate)}%
            </p>
            
            <div className="flex flex-row items-center mt-4 justify-between ">
              <button onClick={() => {openEditModal(membership)}} className="text-white text-xs border bg-blue-500 p-0.5 rounded-xl px-2 cursor-pointer ">Edit</button>
              {
                membership.skipCounter && isActive?
                <button onClick={()=>updateSkips(membership._id,membership.skips +1)} className="text-white text-xs border bg-blue-500 p-0.5 rounded-xl px-2 cursor-pointer hover:bg-green-200 hover:text-green-900 ">Skip Today</button>
                :null
              }
             
              <button onClick={()=>removeMem(membership._id)} className="text-white text-xs border bg-blue-500 p-0.5 rounded-xl px-2 cursor-pointer hover:bg-red-300 " >Delete</button>
            </div>

            
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-gray-600 text-center mt-10 text-lg">
      No memberships added yet. Add one to get started!
    </div>
  )
}
      {/* Edit Modal */}
      {isOpen && selected && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-100 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Membership</h3>

            <label className="block mb-1 font-medium">Membership Name</label>
            <input
              type="text"
             
              onChange={(e)=>setNameEdit(e.target.value)}
              value={nameEdit}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              value={endDateEdit}
              onChange={(e)=>setendDateEdit(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            

            {/* <button
              onClick={renewMembership}
              className="text-green-600 text-sm hover:underline mb-4 block"
            >
              + Renew for 30 more days
            </button> */}


            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={()=>saveChanges(nameEdit,endDateEdit)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Dashboard;
