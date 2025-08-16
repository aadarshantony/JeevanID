// Landing.jsx
import { TiWarning } from "react-icons/ti";
import { FaUsers, FaHeartbeat, FaClock } from "react-icons/fa";
import { TbAlertCircle } from "react-icons/tb";
import { Link } from "react-router-dom";
import HeroImg from '../assets/Hero.jpg'
import JeevanIDCard from "../components/JeevanIDCard";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50 font-sans">

      {/* Hero */}
      <section className="relative max-w-screen-xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-green-500 to-blue-500">
              Emergency
            </span>{" "}
            <br />
            <span className="text-gray-800">Response Dashboard</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Quickly report incidents and coordinate response in real-time. Save lives with efficient action.
          </p>
          <div className="flex gap-4 mt-6">
            <Link
              to="/report"
              className="px-8 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-transform"
            >
              Report Emergency
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-4 border border-orange-500 text-tricolor font-bold rounded-2xl hover:bg-tricolor transform hover:scale-105"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 relative flex justify-center items-center">
          {/* Floating card behind image */}
          <div className="absolute -top-8 -right-8 w-72 h-72 rounded-3xl bg-gradient-to-tr from-orange-100 to-green-100 shadow-2xl transform rotate-6"></div>
          <img
            src={HeroImg}
            alt="JeevanID Card"
            className="relative w-80 md:w-96 h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-tricolor">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:scale-105 transition-transform">
            <FaUsers className="w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real-Time Monitoring</h3>
            <p className="text-gray-500">Track incidents live and respond faster with up-to-date information.</p>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:scale-105 transition-transform">
            <TbAlertCircle className="w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Alerts</h3>
            <p className="text-gray-500">Receive immediate notifications on emergencies for rapid intervention.</p>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:scale-105 transition-transform">
            <FaHeartbeat className="w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Health Coordination</h3>
            <p className="text-gray-500">Connect medical teams, hospitals, and responders seamlessly.</p>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:scale-105 transition-transform">
            <FaClock className="w-10 h-10 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Time-Saving</h3>
            <p className="text-gray-500">Streamline reporting and management to save crucial minutes.</p>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-white py-20 mt-16 text-center">
        <h2 className="text-4xl font-extrabold text-tricolor mb-4">
          Be Ready, Save Lives
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Join our emergency network today and ensure rapid response when it matters most.
        </p>
        <JeevanIDCard />
        <Link to="/register" className="inline-block px-12 py-5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
          Get your JeevanID
        </Link>
      </section>

    </div>
  );
};

export default Landing;
