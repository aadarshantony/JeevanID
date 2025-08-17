import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TbAlertTriangleFilled as AlertTriangle } from "react-icons/tb";
import { FaClock as Clock, FaCheckCircle as CheckCircle, FaUsers as Users, FaPhoneAlt as Phone } from "react-icons/fa";
import { LuSquareActivity as Activity } from "react-icons/lu";
import { CiMapPin as MapPin } from "react-icons/ci";
import ReportsMap from "../components/ReportsMap";
import { getAllReports, updateReportStatus } from "../services/reports";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [filter, setFilter] = useState("all");
  const queryClient = useQueryClient();

  // Fetch all reports (used for stats & list)
  const { data: allIncidents = [], isLoading, isError } = useQuery({
    queryKey: ["reports", filter],
    queryFn: () => getAllReports(),
  });

  // Stats (always from allIncidents)
  const stats = {
    total: allIncidents.length,
    open: allIncidents.filter((i) => i.status === "open").length,
    inProgress: allIncidents.filter((i) => i.status === "in_progress").length,
    resolved: allIncidents.filter((i) => i.status === "resolved").length,
  };

  // Filtered incidents for the list view only
  const filteredIncidents = allIncidents.filter(
    (i) => filter === "all" || i.status === filter
  );

  // Mutation to update report status
  const mutation = useMutation({
    mutationFn: ({ id, nextStatus }) => updateReportStatus(id, nextStatus),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reports"] }),
  });

  const handleStatusChange = (id, currentStatus) => {
    const nextStatus = currentStatus === "open" ? "in_progress" : "resolved";
    mutation.mutate({ id, nextStatus });
  };


  // Status styling helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "bg-orange-100 text-orange-600";
      case "in_progress": return "bg-orange-50 text-orange-500";
      case "resolved": return "bg-green-50 text-green-600";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getButtonColor = (status) => {
    switch (status) {
      case "open": return "bg-orange-500 text-white hover:bg-orange-600";
      case "in_progress": return "bg-green-500 text-white hover:bg-green-600";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open": return <AlertTriangle className="w-4 h-4 inline mr-1" />;
      case "in_progress": return <Activity className="w-4 h-4 inline mr-1" />;
      case "resolved": return <CheckCircle className="w-4 h-4 inline mr-1" />;
      default: return <Clock className="w-4 h-4 inline mr-1" />;
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen">
      <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      <span className="text-gray-500 font-medium">Loading Reports</span>
    </div>
  );
  if (isError) return <p className="p-4 text-center text-red-500">Failed to load reports</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6 max-w-screen-xl m-auto mt-30">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-orange-600 inline">Emergency </h1>
          <span className="text-green-600 font-bold text-3xl">Dashboard</span>
          <p className="text-gray-500 mt-1">Real-time accident monitoring and response coordination</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
            <Users className="w-4 h-4" /> Health Department
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Incidents" count={stats.total} icon={<AlertTriangle className="w-6 h-6 text-orange-300" />} />
        <StatCard title="Open Cases" count={stats.open} icon={<AlertTriangle className="w-6 h-6 text-orange-300" />} color="orange" />
        <StatCard title="In Progress" count={stats.inProgress} icon={<Activity className="w-6 h-6 text-orange-300" />} color="orange" />
        <StatCard title="Resolved" count={stats.resolved} icon={<CheckCircle className="w-6 h-6 text-green-300" />} color="green" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["list", "map"].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded font-medium ${selectedTab === tab ? "bg-white shadow text-black" : "bg-gray-100 text-gray-500"}`}
          >
            {tab === "list" ? "Incident List" : "Map View"}
          </button>
        ))}
      </div>

      {/* Filter */}
      {selectedTab === "list" && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {["all", "open", "in_progress", "resolved"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded font-medium border ${filter === f ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-300"}`}
            >
              {f.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Incident List */}
      {selectedTab === "list" && (
        <div className="space-y-4">
          {filteredIncidents.map(incident => (
            <IncidentCard
              key={incident._id}
              incident={incident}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getButtonColor={getButtonColor}
              handleStatusChange={handleStatusChange}
              MapPin={MapPin}
              Phone={Phone}
            />
          ))}
        </div>
      )}

      {/* Map View */}
      {selectedTab === "map" && <ReportsMap incidents={allIncidents} />}
    </div>
  );
};

// --- Helper Components ---
const StatCard = ({ title, count, icon, color }) => (
  <div className="bg-white shadow rounded p-4 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-xl font-bold ${color === "green" ? "text-green-600" : color === "orange" ? "text-orange-600" : ""}`}>{count}</p>
    </div>
    {icon}
  </div>
);

const IncidentCard = ({ incident, getStatusColor, getStatusIcon, getButtonColor, handleStatusChange, MapPin, Phone }) => (
  <div className="bg-white shadow rounded p-4 flex flex-col md:flex-row justify-between gap-4">
    <div className="flex-1 space-y-2">
      <IncidentHeader incident={incident} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
      <p className="font-semibold">{incident.description}</p>
      <IncidentDetails incident={incident} MapPin={MapPin} Phone={Phone} />
    </div>
    <div className="flex flex-col gap-2 mt-2 md:mt-0">
      <button className="px-3 py-1 border rounded border-gray-300 text-gray-600 hover:bg-gray-100">View Details</button>
      {incident.status !== "resolved" && (
        <button
          className={`px-3 py-1 rounded ${getButtonColor(incident.status)}`}
          onClick={() => handleStatusChange(incident._id, incident.status)}
        >
          {incident.status === "open" ? "Assign Team" : "Mark Resolved"}
        </button>
      )}
    </div>
  </div>
);

const IncidentHeader = ({ incident, getStatusColor, getStatusIcon }) => (
  <div className="flex items-center gap-2 text-sm">
    <span className={`px-2 py-1 rounded font-semibold ${getStatusColor(incident.status)}`}>
      {getStatusIcon(incident.status)}
      {incident.status.replace("_", " ").toUpperCase()}
    </span>
    <span className="text-gray-400">#{incident._id.slice(-5)}</span>
    <span className="text-gray-400">{new Date(incident.createdAt).toLocaleString()}</span>
  </div>
);

const IncidentDetails = ({ incident }) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        {`${incident.location.latitude}, ${incident.location.longitude}`}
      </span>
      <span className="flex items-center gap-1">
        <Phone className="w-4 h-4" /> {incident.reporterPhone}
      </span>
    </div>
    {incident.victim ? (
      <div className="bg-orange-50 p-2 rounded text-sm flex flex-col flex-wrap">
        <h2 className="text-md font-bold">Victim Information:</h2>
        <div className="flex gap-4 flex-wrap">
          <div><strong>Name:</strong> {incident.victim.name}</div>
          <div><strong>Blood:</strong> {incident.victim.bloodGroup}</div>
          <div><strong>Contact:</strong> {incident.victim.emergencyContact}</div>
          <div><strong>Allergies:</strong> {incident.victim.allergies}</div>
          {incident.victim.medicalConditions && <div><strong>Medical:</strong> {incident.victim.medicalConditions}</div>}
        </div>
      </div>
    ) : <p className="bg-orange-50 p-2">Victim info not available.</p>}
  </div>
);

export default Dashboard;
