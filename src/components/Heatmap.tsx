import GoogleMapReact from "google-map-react";
import { CompositeData } from "../model/CompositeData";
import ClipLoader from "react-spinners/ClipLoader";
import { Route } from "../model/Route";
import {} from "google-map-react";
import { useState } from "react";

interface HeatmapData {
  positions: {
    lat: number;
    lng: number;
    weight?: number;
  }[];
  options: {
    radius?: number;
    opacity?: number;
    /* other options directly from Google Heatmaps API */
  };
}

interface Props {
  compositeData: CompositeData | null;
  selectedRoute: Route | null;
}

function parseData(compositeData: CompositeData): HeatmapData {
  const resData: HeatmapData = {
    positions: [],
    options: { radius: 20, opacity: 1 },
  };

  console.log(compositeData);
  for (const loc of compositeData.locations) {
    resData.positions.push({
      lat: loc.latitude,
      lng: loc.longitude,
      weight: 10,
    });
  }

  return resData;
}

export function Heatmap(props: Props) {
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const apiIsLoaded = (map: any) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    setMap(map);
    setDirectionsService(directionsService);
    setDirectionsRenderer(directionsRenderer);
  };

  if (map && directionsService && directionsRenderer) {
    const origin = {
      lat: props.selectedRoute?.start.latitude ?? 0,
      lng: props.selectedRoute?.start.longitude ?? 0,
    };
    const destination = {
      lat: props.selectedRoute?.end.latitude ?? 0,
      lng: props.selectedRoute?.end.longitude ?? 0,
    };
    console.log("RENDERING ROUTE");
    console.log(origin, destination);

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
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  }

  // Return empty div if no data passed in yet
  if (!props.compositeData)
    return <ClipLoader color={"#ffffff"} loading={true} size={150} />;

  // Continue with parsing data
  const heatmap = parseData(props.compositeData);
  const defaultProps = { center: heatmap.positions[0], zoom: 11 };

  return (
    // Important! Always set the container height explicitly
    <div className="h-110 w-[700px]">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBL1xP5iEVz7h8yYSDTrNhSB85e2AWvx8k",
          libraries: ["visualization"],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        heatmap={heatmap}
        heatmapLibrary={true}
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
        yesIWantToUseGoogleMapApiInternals={true}
      ></GoogleMapReact>
    </div>
  );
}
