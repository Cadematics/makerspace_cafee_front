import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function PetitionMap({ newSignature }) {
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    fetchSignatures();
  }, []);

  useEffect(() => {
    if (newSignature) {
      setSignatures((prev) => [...prev, newSignature]);
    }
  }, [newSignature]);

  useEffect(() => {
    const interval = setInterval(fetchSignatures, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchSignatures = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/petitions/");
      setSignatures(res.data);
    } catch (err) {
      console.error("Failed to load petition signatures:", err);
    }
  };

  return (
    <div className="w-full h-[80vh] rounded shadow-md overflow-hidden">
      <MapContainer
        center={[37.7749, -122.4194]} // Default center: San Francisco
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>'
          url="https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
        /> */}

        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {signatures
          .filter((p) => p.lat !== undefined && p.lng !== undefined)
          .map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <strong>{p.name}</strong>
                <br />
                {p.city}, {p.state}
                <br />
                {p.message}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default PetitionMap;
