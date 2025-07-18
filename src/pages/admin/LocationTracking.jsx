// src/pages/Admin/LocationTracking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const LocationTracking = () => {
  const [staffLocations, setStaffLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('https://superlab-backend-ucpo.onrender.com/api/admin/staff-list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filtered = res.data.filter(
          (staff) => staff.location && staff.location.latitude && staff.location.longitude
        );
        setStaffLocations(filtered);
      } catch (err) {
        console.error('Error fetching locations:', err.message);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 30000);
    return () => clearInterval(interval);
  }, []);

  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div>
      <h2>Live Staff Location Tracker</h2>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {staffLocations.map((staff) => (
          <Marker
            key={staff._id}
            position={[staff.location.latitude, staff.location.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong>{staff.name}</strong><br />
              Last updated: {new Date(staff.location.updatedAt).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationTracking;
