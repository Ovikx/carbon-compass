import { Route } from "../model/Route";
import { CompositeData } from "../model/CompositeData";
import { Heatmap } from "./Heatmap";
import TopTrips from "./TopTrips";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  compositeData: CompositeData | null;
}

export function HeatmapWrapper({ compositeData }: Props) {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    if (compositeData) {
      setSelectedRoute(compositeData.routes[0]);
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
          routes={compositeData.routes.slice(0, 3)}
        />
      </div>
    </div>
  );
}
