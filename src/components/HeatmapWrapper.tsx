import { Route } from "../model/Route";
import { CompositeData } from "../model/CompositeData";
import { Heatmap } from "./Heatmap";
import TopTrips from "./TopTrips";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { flattenHierarchy, getCarbonForCar } from "../utils/utils";

interface Props {
  compositeData: CompositeData | null;
}

export function HeatmapWrapper({ compositeData }: Props) {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    if (compositeData) {
      const flattened = flattenHierarchy(compositeData.routes).sort(
        (a, b) => getCarbonForCar(b.distance) - getCarbonForCar(a.distance),
      );
      setRoutes(flattened);
      setSelectedRoute(flattened[0]);
    }
  }, [compositeData]);

  if (!compositeData) {
    return <ClipLoader color={"#ffffff"} loading={true} size={150} />;
  }

  return (
    <div className="grid grid-cols-2 px-10 pt-10">
      <Heatmap compositeData={compositeData} selectedRoute={selectedRoute} />
      <div className="left-align text-lg ml-10 justify-start">
        <TopTrips
          setSelectedRoute={setSelectedRoute}
          selectedRoute={selectedRoute}
          routes={routes.slice(0, 3)}
        />
      </div>
    </div>
  );
}
