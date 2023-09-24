import GoogleMapReact from "google-map-react";
import { CompositeData } from "../model/CompositeData";
import ClipLoader from "react-spinners/ClipLoader";
import { Route } from "../model/Route";
import { useEffect, useContext } from "react";
import { MapContext } from "./MapContext";

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

export const mapApiKey = "AIzaSyBL1xP5iEVz7h8yYSDTrNhSB85e2AWvx8k";

function parseData(compositeData: CompositeData): HeatmapData {
  const resData: HeatmapData = {
    positions: [],
    options: { radius: 20, opacity: 1 },
  };

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
  const {
    directionsRenderer,
    directionsService,
    setDirectionsRenderer,
    setDirectionsService,
    setMap,
  } = useContext(MapContext);

  const apiIsLoaded = (map: any) => {
    console.log("API LOADED");
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    console.log("DIRECTIONS  LOADED");
    directionsRenderer.setMap(map);
    if (setMap) {
      console.log("SETTING MAP");
      setMap(map);
    }

    if (setDirectionsService) {
      console.log("SETTING DIRECTIONS SERVICE");
      setDirectionsService(directionsService);
    }

    if (setDirectionsRenderer) {
      console.log("SETTING DIRECTIONS RENDERER");
      setDirectionsRenderer(directionsRenderer);
    }
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
            console.log("rendering route");
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  }, [directionsRenderer, directionsService, props.selectedRoute]);

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
          key: mapApiKey,
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
