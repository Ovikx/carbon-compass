import { Route } from "../model/Route";
import { CompositeData } from "../model/CompositeData";
import { Heatmap } from "./Heatmap";
import TopTrips from "./TopTrips";
import { useState } from "react";

interface Props {
  compositeData: CompositeData | null;
}

export function HeatmapWrapper(props: Props) {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  return (
    <div className="grid grid-cols-2 px-10 pt-10">
      <Heatmap
        compositeData={props.compositeData}
        selectedRoute={selectedRoute}
      />
      <div className="left-align text-lg mt-12 ml-10">
        <TopTrips setSelectedRoute={setSelectedRoute} />
      </div>
    </div>
  );
}
