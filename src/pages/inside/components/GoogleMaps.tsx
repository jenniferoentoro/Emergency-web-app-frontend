import React, { useEffect, useRef } from "react";
import { addSingleMarkers } from "./addSingleMarkers";

export const GoogleMaps = ({
  locations,
  className,
  onMapClick,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  className?: string;
  onMapClick?: (latLng: google.maps.LatLngLiteral) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Calculate the average latitude and longitude
    const averageLatLng = calculateAverageLatLng(locations);

    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: averageLatLng,
        zoom: DEFAULT_ZOOM ?? 14, // Use the default value if DEFAULT_ZOOM is undefined
      });

      // Add event listener for map click
      map.addListener("click", (event: any) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        // If onMapClick function is provided, call it with the clicked location
        if (onMapClick) {
          onMapClick(clickedLocation);
        }

        // Update the markers on the map
        addSingleMarkers({ locations: [clickedLocation], map });
      });

      // Add event listener for zoom change
      map.addListener("zoom_changed", () => {
        // Update the DEFAULT_ZOOM when the user zooms in or out
        const newZoom = map.getZoom();
        if (newZoom !== DEFAULT_ZOOM) {
          DEFAULT_ZOOM = newZoom;
        }
      });

      // Display initial markers
      addSingleMarkers({ locations, map });
    }
  }, [ref, locations, onMapClick]);

  // Calculate the average latitude and longitude
  const calculateAverageLatLng = (
    locs: ReadonlyArray<google.maps.LatLngLiteral>
  ) => {
    const totalLat = locs.reduce((acc, loc) => acc + loc.lat, 0);
    const totalLng = locs.reduce((acc, loc) => acc + loc.lng, 0);
    const averageLat = totalLat / locs.length;
    const averageLng = totalLng / locs.length;
    return { lat: averageLat, lng: averageLng };
  };

  let DEFAULT_ZOOM: number | undefined; // Use let so that it can be reassigned

  return <div ref={ref} style={{ width: "100%", height: "500px" }} />;
};
