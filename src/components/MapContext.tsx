import { createContext, useState } from "react";

interface MapState {
  map: google.maps.Map | null;
  directionsService: google.maps.DirectionsService | null;
  directionsRenderer: google.maps.DirectionsRenderer | null;
  setMap: ((map: google.maps.Map) => void) | null;
  setDirectionsService:
    | ((directionsService: google.maps.DirectionsService) => void)
    | null;
  setDirectionsRenderer:
    | ((directionsRenderer: google.maps.DirectionsRenderer) => void)
    | null;
}

export const MapContext = createContext<MapState>({
  map: null,
  directionsService: null,
  directionsRenderer: null,
  setMap: null,
  setDirectionsService: null,
  setDirectionsRenderer: null,
});

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  return (
    <MapContext.Provider
      value={{
        map: map,
        directionsService: directionsService,
        directionsRenderer: directionsRenderer,
        setMap: setMap,
        setDirectionsService: setDirectionsService,
        setDirectionsRenderer: setDirectionsRenderer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
