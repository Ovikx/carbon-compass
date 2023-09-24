import GoogleMapReact from "google-map-react";
import ClipLoader from "react-spinners/ClipLoader";
import { Route } from "../model/Route";
import { useEffect, useState } from "react";
import { mapApiKey } from "./Heatmap";

interface Props {
  selectedRoute: Route | null;
}

export function BaseMap(props: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  const apiIsLoaded = (map: any) => {
    console.log("API LOADED");
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    console.log("DIRECTIONS  LOADED");
    directionsRenderer.setMap(map);
    setMap(map);

    setDirectionsService(directionsService);

    setDirectionsRenderer(directionsRenderer);
  };

  useEffect(() => {
    if (directionsService && directionsRenderer) {
      console.log("RENDERING");
      const origin = {
        lat: props.selectedRoute?.start.latitude ?? 0,
        lng: props.selectedRoute?.start.longitude ?? 0,
      };
      const destination = {
        lat: props.selectedRoute?.end.latitude ?? 0,
        lng: props.selectedRoute?.end.longitude ?? 0,
      };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          directionsRenderer.setDirections({
            routes: [],
            geocoded_waypoints: [],
          });
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            console.log("rendering route");
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  }, [map, directionsRenderer, directionsService, props.selectedRoute]);

  // Return empty div if no data passed in yet
  if (!props.selectedRoute)
    return <ClipLoader color={"#ffffff"} loading={true} size={150} />;

  return (
    // Important! Always set the container height explicitly
    <div className="h-80 w-[500px] shadow-xl ">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: mapApiKey,
          libraries: ["visualization"],
        }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={11}
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
        yesIWantToUseGoogleMapApiInternals={true}
      ></GoogleMapReact>
    </div>
  );
}
