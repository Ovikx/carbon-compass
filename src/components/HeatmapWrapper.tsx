import { Route } from "../model/Route";
import { CompositeData } from "../model/CompositeData";
import { Heatmap } from "./Heatmap";
import TopTrips from "./TopTrips";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { flattenHierarchy, getCarbonForCar } from "../utils/utils";
import AltEmissions from "./AltEmissions";

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
    <div className="flex flex-col">
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
      <div className="py-32">
        <h1 className="font-bold text-4xl">Taking the train instead...</h1>
        <div className="py-10 grid grid-cols-2 gap-x-5 gap-y-10">
          <AltEmissions route={selectedRoute} transportType="IN_TRAIN" />
          <p className="flex items-center font-medium text-2xl pr-4">
            If you can, choose the train for a greener and stress-free commute,
            reducing traffic congestion and helping the environment.
          </p>
        </div>
        <h1 className="font-bold text-4xl pt-10">Taking the bus instead...</h1>
        <div className="py-10 grid grid-cols-2 gap-x-5 gap-y-10 ">
          <AltEmissions route={selectedRoute} transportType="IN_BUS" />
          <p className="flex items-center font-medium text-2xl pr-4">
            Opt for the bus to save money, reduce your carbon footprint, and
            ease traffic congestion on our roads.
          </p>
        </div>
      </div>
    </div>
  );
}
