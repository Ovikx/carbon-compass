import { Route } from "../model/Route";
import { CompositeData } from "../model/CompositeData";
import { Heatmap } from "./Heatmap";
import TopTrips from "./TopTrips";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { calculateCarbonWasted, flattenHierarchy } from "../utils/utils";

interface Props {
  compositeData: CompositeData | null;
}

export function HeatmapWrapper({ compositeData }: Props) {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    if (compositeData) {
      const flattened = flattenHierarchy(compositeData.routes).sort(
        (a, b) => calculateCarbonWasted(b) - calculateCarbonWasted(a),
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
      <div className="left-align text-lg mt-12 ml-10">
        <TopTrips
          setSelectedRoute={setSelectedRoute}
          selectedRoute={selectedRoute}
          routes={routes.slice(0, 3)}
        />
      </div>
    </div>
  );
}
