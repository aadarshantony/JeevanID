// ReportsMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaPhoneAlt } from "react-icons/fa";

// Orange marker icon
const orangeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [50, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40],
});

const ReportsMap = ({ incidents }) => {
  // Only include open and in_progress incidents with valid coordinates
  const validIncidents = incidents
    .filter(i => i.status === "open" || i.status === "in_progress")
    .map((i) => {
      const lat = i.location.lat ?? i.location.latitude;
      const lng = i.location.lng ?? i.location.longitude;
      if (lat == null || lng == null) return null;
      return { ...i, lat, lng };
    })
    .filter(Boolean);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      scrollWheelZoom={true}
      className="h-[600px] rounded border border-gray-300 shadow-2xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />

      {validIncidents.map((incident) => (
        <Marker
          key={incident._id}
          position={[incident.lat, incident.lng]}
          icon={orangeIcon}
        >
          <Popup className="shadow-lg p-2">
            <h3 className="font-bold text-orange-600">{incident.status.toUpperCase()}</h3>
            <p className="text-gray-700">{incident.description}</p>
            <p>
              <FaPhoneAlt className="inline mr-1" /> {incident.reporterPhone}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ReportsMap;
