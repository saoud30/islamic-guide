import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

const QiblaFinder = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      // Calculate Qibla direction (simplified calculation)
      const kaabaLat = 21.4225;
      const kaabaLon = 39.8262;
      
      const latDiff = kaabaLat - location.lat;
      const lonDiff = kaabaLon - location.lon;
      
      const angle = Math.atan2(
        Math.sin(lonDiff),
        Math.cos(location.lat) * Math.tan(kaabaLat) -
          Math.sin(location.lat) * Math.cos(lonDiff)
      );
      
      setQiblaDirection((angle * 180) / Math.PI);
    }
  }, [location]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Compass className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-semibold text-gray-800">Qibla Direction</h2>
      </div>

      {qiblaDirection !== null ? (
        <div className="text-center">
          <div
            className="w-32 h-32 mx-auto mb-4 relative"
            style={{
              transform: `rotate(${qiblaDirection}deg)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <Compass className="w-full h-full text-emerald-600" />
          </div>
          <p className="text-gray-700">
            Qibla is approximately {Math.round(qiblaDirection)}° from North
          </p>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          Calculating Qibla direction...
        </div>
      )}
    </div>
  );
};

export default QiblaFinder;