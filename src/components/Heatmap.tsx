import GoogleMapReact, { Heatmap } from "google-map-react";
import { CompositeData } from "../model/CompositeData";
//import ClipLoader from "react-spinners/ClipLoader";

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

  // Return empty div if no data passed in yet
  // if (!props.compositeData)
  //   return <ClipLoader color={"#ffffff"} loading={true} size={150} />;

  // Continue with heatmap data parsing
  const heatmap: Heatmap = props.compositeData
    ? parseData(props.compositeData)
    : { positions: [], options: {} };

  const defaultProps = props.compositeData
    ? {
        center: heatmap.positions[0],
        zoom: 11,
      }
    : { center: { lat: 29.714233, lng: -95.404075 }, zoom: 11 };

  return (
    // Important! Always set the container height explicitly
    <div className="h-110 w-110 mx-auto">
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
