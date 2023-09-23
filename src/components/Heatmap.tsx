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
    <div className="h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
          libraries: ["visualization"],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        heatmap={heatmap}
      ></GoogleMapReact>
    </div>
  );
}
