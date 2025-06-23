import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function getColorByName(name) {
  const colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#42d4f4",
    "#f032e6",
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return colors[sum % colors.length];
}

function PetitionMap({ newSignature }) {
  const [signatures, setSignatures] = useState([]);
  const [geoData, setGeoData] = useState(null);
  const [showNeighborhoods, setShowNeighborhoods] = useState(false);

  useEffect(() => {
    fetchSignatures();
    fetch("/data/sf_neighborhoods.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON", err));

    const interval = setInterval(fetchSignatures, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newSignature) {
      setSignatures((prev) => [...prev, newSignature]);
    }
  }, [newSignature]);

  const fetchSignatures = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/petitions/");
      setSignatures(res.data);
    } catch (err) {
      console.error("Failed to load petition signatures:", err);
    }
  };

  return (
    <div className="relative w-full h-screen sticky top-0 z-10">
      {/* Checkbox Overlay */}
      <div className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow-md">
        <label className="text-sm">
          <input
            type="checkbox"
            checked={showNeighborhoods}
            onChange={() => setShowNeighborhoods(!showNeighborhoods)}
            className="mr-2"
          />
          Show Neighborhoods
        </label>
      </div>

      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Conditionally show GeoJSON */}
        {showNeighborhoods && geoData && (
          <GeoJSON
            data={geoData}
            style={(feature) => ({
              fillColor: getColorByName(feature.properties.name || "default"),
              color: "#555",
              weight: 1,
              fillOpacity: 0.3,
            })}
          />
        )}

        {signatures
          .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
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

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Color function
// function getColorByName(name) {
//   const colors = [
//     "#e6194b",
//     "#3cb44b",
//     "#ffe119",
//     "#4363d8",
//     "#f58231",
//     "#911eb4",
//     "#42d4f4",
//     "#f032e6",
//   ];
//   let sum = 0;
//   for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
//   return colors[sum % colors.length];
// }

// function PetitionMap({ newSignature }) {
//   const [signatures, setSignatures] = useState([]);
//   const [geoData, setGeoData] = useState(null);

//   useEffect(() => {
//     fetchSignatures();
//     fetch("/data/sf_neighborhoods.geojson")
//       .then((res) => res.json())
//       .then((data) => setGeoData(data))
//       .catch((err) => console.error("Failed to load GeoJSON", err));

//     const interval = setInterval(fetchSignatures, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (newSignature) {
//       setSignatures((prev) => [...prev, newSignature]);
//     }
//   }, [newSignature]);

//   const fetchSignatures = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/petitions/");
//       setSignatures(res.data);
//     } catch (err) {
//       console.error("Failed to load petition signatures:", err);
//     }
//   };

//   return (
//     <div className="w-full h-screen sticky top-0 z-10">
//       <MapContainer
//         center={[37.7749, -122.4194]}
//         zoom={12}
//         style={{ width: "100%", height: "100%" }}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://carto.com/">Carto</a>'
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         />

//         {/* Only render GeoJSON if loaded */}
//         {geoData && (
//           <GeoJSON
//             data={geoData}
//             style={(feature) => ({
//               fillColor: getColorByName(feature.properties.name || "default"),
//               color: "#555",
//               weight: 1,
//               fillOpacity: 0.3,
//             })}
//           />
//         )}

//         {signatures
//           .filter((p) => typeof p.lat === "number" && typeof p.lng === "number")
//           .map((p) => (
//             <Marker key={p.id} position={[p.lat, p.lng]}>
//               <Popup>
//                 <strong>{p.name}</strong>
//                 <br />
//                 {p.city}, {p.state}
//                 <br />
//                 {p.message}
//               </Popup>
//             </Marker>
//           ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default PetitionMap;
