import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';
import ViewId from "./pages/ViewId";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
          <Route path="/jeevanid" element={<ViewId />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App
