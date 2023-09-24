import { useContext, useEffect, useState } from "react";
import { Heatmap } from "../components/Heatmap";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { default as Environment } from "../assets/environment.svg";
import { default as Report } from "../assets/report.jpg";
import { FileContext } from "../components/FileContext";
import { Unzip } from "../read/Unzip";
import { CompositeData } from "../model/CompositeData";
import TopTrips from "../components/TopTrips";
import { flattenHierarchy } from "../utils/utils";
import RouteModal from "../components/RouteModal";
import { Route } from "../model/Route";
import { Dialog } from "@headlessui/react";

export function Tracker() {
  const [data, setData] = useState<CompositeData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [route, setRoute] = useState<Route | null>(null);
  const fileContext = useContext(FileContext);
  useEffect(() => {
    if (fileContext.file) {
      Unzip.unzipLocationHistory(fileContext.file).then((res) => {
        setData(res);
      });
    }
  }, [fileContext.file]);

  return (
    <div className="mt-24">
      <Parallax pages={4}>
        <ParallaxLayer
          speed={1}
          factor={1}
          style={{
            backgroundImage: `url(${Report})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-row justify-center align-middle">
            <div className="flex flex-col justify-center align-middle"></div>
          </div>
          <h1 className="left-align text-5xl font-bold text-white pt-90 mt-60">
            Your Carbon Footprint Report
          </h1>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5} style={{ backgroundColor: "" }}>
          <div className="flex flex-col justify-center align-middle">
            <h1 className="left-align text-4xl font-bold pt-90  mb-5">
              Your Carbon Heatmap
            </h1>
            <HeatmapWrapper compositeData={data} />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <div className="flex flex-row justify-center align-middle">
            <div className="left-align pointer-events-none">
              <p className="left-align">Breakdown</p>
              <p className="left-align">Point 1</p>
              <p className="left-align">Point 2</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${Environment})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "500px",
                width: "500px",
              }}
            ></div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.25}>
          <div className="left-align ">
            <h2 className="left-align">Table</h2>
            <button onClick={() => setIsOpen(true)}>view trip</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-1/2 h-1/2 rounded bg-white justify-center align-middle">
                  <Dialog.Title>
                    Trip from {route?.startTimestamp} to {route?.endTime} of{" "}
                    {route?.distance} km wasting {route?.distance * 5} kg.
                  </Dialog.Title>
                  <Dialog.Description>
                    This will permanently deactivate your account
                  </Dialog.Description>
                  {/* <p>This amount of Carbon could have been saved: {carbonSaved}</p> */}
                  <button onClick={() => setIsOpen(false)}>Deactivate</button>
                  <button onClick={() => setIsOpen(false)}>Cancel</button>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
          {!!data ? (
            <div className="flex flex-col text-xl gap-3">
              {Array.from(data.routes.keys())
                .sort()
                .reverse()
                .map((category) => {
                  return (
                    <Collapsible trigger={category}>
                      {Array.from(data.routes.get(category)!.keys())
                        .sort()
                        .map((subcategory) => {
                          return (
                            <Collapsible trigger={subcategory}>
                              {data.routes
                                .get(category)!
                                .get(subcategory)!
                                .sort((a, b) => {
                                  return b.startTimestamp - a.startTimestamp;
                                })
                                .map((route: Route) => {
                                  return (
                                    <div>
                                      <h3>{route.startTimestamp}</h3>
                                      <p>{route.endTimestamp}</p>
                                    </div>
                                  );
                                })}
                            </Collapsible>
                          );
                        })}
                    </Collapsible>
                  );
                })}
            </div>
          ) : (
            <></>
          )}
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
