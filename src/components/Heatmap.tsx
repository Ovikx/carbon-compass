import GoogleMapReact from "google-map-react";

interface IHeatmap {
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

export function Heatmap() {
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

  const heatmap: IHeatmap = {
    positions: [
      {
        lat: 10.99835602,
        lng: 77.01502627,
      },
    ],
    options: {},
  };

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
