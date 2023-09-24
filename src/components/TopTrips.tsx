import { Route } from "../model/Route";
import MapRoute from "./MapRoute";

interface Props {
  routes: Route[];
  selectedRoute: Route | null;
  setSelectedRoute: (route: Route) => void;
}

export default function TopTrips({
  selectedRoute,
  routes,
  setSelectedRoute,
}: Props) {
  return (
    <>
      <div className="grid grid-rows-3 px-10 gap-2">
        <h2 className="font-bold text-3xl">Your 3 Biggest Trips</h2>
        {routes.map((route) => (
          <MapRoute
            route={route}
            setSelectedRoute={setSelectedRoute}
            selected={route == selectedRoute}
            key={route.startTimestamp}
          />
        ))}
      </div>
    </>
  );
}
