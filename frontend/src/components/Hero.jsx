import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets"; // adjust path as needed
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const HeroSection = () => {

  const {token} = useContext(AppContext)
  useEffect(()=>{

  },[token])

  return (
    <section className=" min-h-[80vh] flex items-center px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Text Side */}
        <div className="text-center md:text-left">
          <i className="text-xl  text-gray-700">"Subscriptions change. Your tracking shouldn’t."</i>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">MTrack</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Effortlessly manage all your memberships — gym, mess, OTT, and more — in one place.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            {token ? (
              <Link to="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
                  Go to Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
                  Get Started
                </button>
              </Link>
            )}

            <button
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Side */}
        <div className="flex justify-center">
          <img
            src={assets.heroimg}
            alt="MTrack Preview"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
