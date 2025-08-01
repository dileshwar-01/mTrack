import React from 'react'

const About = () => {
  return (
    <section id="about" className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About mTrack .</h2>
        <p className="text-lg text-gray-600 mb-8">
          mTrack is your all-in-one dashboard to manage and track all your memberships, subscriptions,
          and usage — from gym and mess plans to OTT services and mobile recharges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800"> Why mTrack?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>No more forgotten renewal dates</li>
              <li>Track skipped mess days or remaining gym days</li>
              <li>Visual progress & expiry reminders</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-gray-800"> Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Flexible membership types (gym, mess, OTT, recharge, etc.)</li>
              <li>Smart dashboard with progress bars & filters</li>
              <li>Fully responsive and easy to use</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About
