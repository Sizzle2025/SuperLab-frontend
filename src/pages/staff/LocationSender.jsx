// src/components/LocationSender.jsx
import { useEffect } from "react";

const LocationSender = () => {
  useEffect(() => {
    const sendLocation = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await axios.post(
  'http://localhost:5000/api/staff/update-location',
  { latitude, longitude },
  {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Must be present
    },
  }
);

              const data = await res.json();

              if (!res.ok) throw new Error(data.message);
              console.log("📍 Location sent successfully");
            } catch (err) {
              console.error("❌ Failed to send location:", err.message);
            }
          },
          (err) => {
            console.error("🚫 Location permission denied", err);
          }
        );
      } else {
        console.error("❌ Geolocation not available");
      }
    };

    sendLocation();
    const interval = setInterval(sendLocation, 30000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default LocationSender;
