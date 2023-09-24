import { Route } from "../model/Route";
import MapRoute from "./MapRoute";

interface Props {
  setSelectedRoute: (route: Route) => void;
}

export default function TopTrips({ setSelectedRoute }: Props) {
  return (
    <>
      <div className="grid grid-rows-3 px-10">
        <h2 className="font-bold text-3xl">Your 3 Biggest Trips</h2>
        <MapRoute
          city1="San Francisco"
          city2="Los Angeles"
          carbonUsage={382}
          vehicle={"bus"}
        />
        <MapRoute
          city1="Houston"
          city2="Boston"
          carbonUsage={168}
          vehicle={"vehicle"}
        />
        <MapRoute
          city1="Neverland"
          city2="Dumbledore"
          carbonUsage={124}
          vehicle={"bus"}
        />
      </div>
    </>
  );
}
