import React, { useState } from "react";

// Dummy Data
const initialMemberships = [
  {
    id: 1,
    name: "Bullstrong Gym Membership",
    type: "gym",
    startDate: "2025-07-23",
    endDate: "2025-08-21",
  },
  {
    id: 2,
    name: "White House Mess",
    type: "mess",
    startDate: "2025-08-01",
    endDate: "2025-08-30",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    type: "ott",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
  },
  {
    id: 3,
    name: "Jio Sim Recharge",
    type: "phone",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
  },
];

const Dashboard = () => {
  const [memberships, setMemberships] = useState(initialMemberships);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openEditModal = (membership) => {
    setSelected({ ...membership }); // clone to avoid mutation
    setIsOpen(true);
  };

  const saveChanges = () => {
    const updated = memberships.map((m) =>
      m.id === selected.id ? selected : m
    );
    setMemberships(updated);
    setIsOpen(false);
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

  

  const renewMembership = () => {
    const newEnd = new Date(selected.endDate);
    newEnd.setDate(newEnd.getDate() + 30);
    setSelected({
      ...selected,
      endDate: newEnd.toISOString().split("T")[0],
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Memberships</h2>


{
  memberships.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memberships.map((membership) => {
        const today = new Date();
        const end = new Date(membership.endDate);
        const isActive = today <= end;

        return (
          <div
            key={membership.id}
            className="bg-white p-5 rounded-lg shadow border relative"
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
            <p className="text-gray-800 text-sm">Started on: <span className="font-medium">{membership.startDate} </span> </p>
            <p className="text-gray-800 text-sm">Ending on: <span className="font-medium">{membership.endDate} </span> </p>
            <p className="text-gray-800 text-sm">Days Left: <span className="font-medium">{getDaysLeft(membership.endDate)} </span> </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${getProgress(membership.startDate, membership.endDate)}%` }}
                  ></div>
           </div>

            <p className="text-xs text-gray-500 mt-1">
              Progress: {getProgress(membership.startDate, membership.endDate)}%
            </p>
            <button
              onClick={() => openEditModal(membership)}
              className="text-blue-600 mt-4 text-sm hover:underline"
            >
              Edit
            </button>
            
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
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Membership</h3>

            <label className="block mb-1 font-medium">Membership Name</label>
            <input
              type="text"
              value={selected.name}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              value={selected.endDate}
              onChange={(e) =>
                setSelected({ ...selected, endDate: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <button
              onClick={renewMembership}
              className="text-green-600 text-sm hover:underline mb-4 block"
            >
              + Renew for 30 more days
            </button>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
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
