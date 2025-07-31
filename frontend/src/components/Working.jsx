import React from "react";
import { FaUserPlus, FaListUl, FaCheckCircle, FaChartPie } from "react-icons/fa";

const Working = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-3xl text-blue-600" />,
      title: "Sign Up & Login",
      desc: "Create your account and get started instantly with a secure login.",
    },
    {
      icon: <FaListUl className="text-3xl text-blue-600" />,
      title: "Add Memberships",
      desc: "Add your gym, mess, OTT, or any recurring service in just a few clicks.",
    },
    {
      icon: <FaCheckCircle className="text-3xl text-blue-600" />,
      title: "Track Daily Usage",
      desc: "Mark attendance, track skips, and manage renewals all in one place.",
    },
    {
      icon: <FaChartPie className="text-3xl text-blue-600" />,
      title: "View Insights",
      desc: "Get personalized stats, usage patterns, and end date predictions.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6" id="how-it-works">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">How It Works</h2>
        <p className="text-gray-600 mb-12 text-lg">
          MTrack simplifies your routine — here’s how you can start in 4 easy steps.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;
