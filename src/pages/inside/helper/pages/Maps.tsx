// @ts-nocheck
import { Box } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomMarkerImage from "../../../../assets/img/mapsMarker.png"; // Replace with your custom marker image URL
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };

function Maps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAgXhBnoStoLIpid41L6N7Q_KPBfYsZN1k",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return "Loading...";
  } else {
    calculateRoute();
  }

  async function calculateRoute() {
    const originLat = 51.4392064;
    const originLng = 5.4689792;

    const destinationLat = 51.4424832;
    const destinationLng = 5.4657024;

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: originLat, lng: originLng },
      destination: { lat: destinationLat, lng: destinationLng },
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <>
      {/* <Box position="absolute" left={0} top={0} h="100%" w="100%"> */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker
          position={center}
          // icon={{
          //   url: CustomMarkerImage,
          //   scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
          // }}
        />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      {/* </Box> */}
      {/* <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<NearMeIcon />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<AccessTimeIcon />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box> */}
    </>
  );
}

export default Maps;
