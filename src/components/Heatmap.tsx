import GoogleMapReact from "google-map-react";
import { CompositeData } from "../model/CompositeData";
import ClipLoader from "react-spinners/ClipLoader";

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
}

function parseData(compositeData: CompositeData): HeatmapData {
  const resData: HeatmapData = {
    positions: [],
    options: {},
  };

  console.log(compositeData);
  for (const loc of compositeData.locations) {
    resData.positions.push({
      lat: loc.latitude,
      lng: loc.longitude,
    });
  }

  return resData;
}

export function Heatmap(props: Props) {
  const apiIsLoaded = (map: any) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    const origin = { lat: 40.756795, lng: -73.954298 };
    const destination = { lat: 41.756795, lng: -78.954298 };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  // Return empty div if no data passed in yet
  if (!props.compositeData)
    return <ClipLoader color={"#ffffff"} loading={true} size={150} />;

  // Continue with heatmap data parsing
  const heatmap = parseData(props.compositeData);

  return (
    // Important! Always set the container height explicitly
    <div className="h-110 w-110 mx-auto">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
          libraries: ["visualization"],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        heatmap={heatmap}
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map)}
      ></GoogleMapReact>
    </div>
  );
}
