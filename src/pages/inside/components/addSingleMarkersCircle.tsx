export const addSingleMarkersCircle = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) =>
  locations.map((position) => {
    const circleSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "blue",
      fillOpacity: 0.8,
      scale: 8,
      strokeColor: "white",
      strokeWeight: 2,
    };

    return new google.maps.Marker({
      position,
      map,
      icon: circleSymbol,
    });
  });
