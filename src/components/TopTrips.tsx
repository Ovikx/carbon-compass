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
      <h2 className="font-bold text-3xl pb-7 ">Your 3 Biggest Trips</h2>
      <div className="flex flex-col px-10 gap-5">
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
