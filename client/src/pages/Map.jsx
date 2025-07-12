import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapListings() {
  const [userLocation, setUserLocation] = useState(null);
  const [radiusKm, setRadiusKm] = useState(2); // radius in kilometers

  const listings = [
    {
      id: 1,
      name: "Blue Denim Jacket",
      lat: 28.6129,
      lng: 77.2295,
      image: "https://via.placeholder.com/100x100?text=Jacket",
    },
    {
      id: 2,
      name: "Floral Dress",
      lat: 28.6139,
      lng: 77.22,
      image: "https://via.placeholder.com/100x100?text=Dress",
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err)
    );
  }, []);

  return (
    <div className="h-screen w-full flex">
      {/* Map Section */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-[1000] bg-white p-2 rounded shadow">
          <label className="text-sm font-medium">Radius (km): </label>
          <input
            type="number"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="ml-2 px-2 py-1 border rounded w-24"
          />
        </div>

        {userLocation ? (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={defaultIcon}
            >
              <Popup>You are here 📍</Popup>
            </Marker>

            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={radiusKm * 1000}
              pathOptions={{
                fillColor: "#blue",
                color: "#3b82f6",
                fillOpacity: 0.2,
              }}
            />

            {listings.map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={defaultIcon}
              >
                <Popup>
                  <div className="text-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 mb-1 object-cover rounded"
                    />
                    <strong>{item.name}</strong>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="text-center mt-10">Fetching your location...</div>
        )}
      </div>

      {/* Listing Section */}
      <div className="w-72 bg-white border-l overflow-y-auto p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Nearby Listings</h2>
        {listings.map((item) => (
          <div
            key={item.id}
            className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded object-cover mr-3 border"
            />
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-gray-500">
                Lat: {item.lat.toFixed(4)} | Lng: {item.lng.toFixed(4)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
