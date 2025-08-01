import React from "react";
import { FaCalendarCheck, FaDumbbell, FaTv, FaChartLine } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaCalendarCheck className="text-3xl text-blue-600" />,
      title: "Attendance Tracking",
      desc: "Track member check-ins and absences automatically.",
    },
    {
      icon: <FaDumbbell className="text-3xl text-blue-600" />,
      title: "Gym & Mess Management",
      desc: "Manage gym usage, mess skips, and remaining meals with ease.",
    },
    {
      icon: <FaTv className="text-3xl text-blue-600" />,
      title: "OTT Subscriptions",
      desc: "Never forget your OTT renewals — keep everything in one dashboard.",
    },
    {
      icon: <FaChartLine className="text-3xl text-blue-600" />,
      title: "Insightful Dashboard",
      desc: "Visualize your usage, skipped days, and expiry predictions.",
    },
  ];

  return (
    <section id="features" className=" py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Core Features</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Everything you need to manage your memberships — in one powerful platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Features;
