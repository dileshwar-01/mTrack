import React from 'react'

const AddMembership = () => {
  return (
    <div className="px-4 h-screen -mt-14 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6 text-center">
          Add Your Membership Plan
        </h2>
      <div className="w-full max-w-md  bg-white p-8 rounded-lg shadow-md">

        <form className="flex flex-col gap-4">
          <input
            className="border px-3 py-2 rounded-md w-full"
            type="text"
            name="membershipName"
            placeholder="Enter membership name"
          />
          <input
            className="border px-3 py-2 rounded-md w-full"
            type="text"
            name="membershipType"
            placeholder="Enter membership type"
          />

          <div className="flex flex-col">
            <label htmlFor="startDate" className="mb-1 text-sm text-gray-600">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="endDate" className="mb-1 text-sm text-gray-600">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Membership
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddMembership
