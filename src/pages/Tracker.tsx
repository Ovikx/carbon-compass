import { useContext, useEffect, useState } from "react";
import { Heatmap } from "../components/Heatmap";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { default as Environment } from "../assets/environment.svg";
import { default as Report } from "../assets/report.jpg";
import { FileContext } from "../components/FileContext";
import { Unzip } from "../read/Unzip";
import { CompositeData } from "../model/CompositeData";
import TopTrips from "../components/TopTrips";
import Modal from "react-modal";
import { HeatmapWrapper } from "../components/HeatmapWrapper";
import Collapsible from "react-collapsible";
import { Route } from "../model/Route";

export function Tracker() {
  const [data, setData] = useState<CompositeData | null>(null);
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
          <div className="left-align pointer-events-none">
            <h2 className="left-align text-4xl">Table</h2>
          </div>
          {!!data ? (
            <div className="flex flex-col text-xl gap-3 border border-black mx-80">
              {Array.from(data.routes.keys())
                .sort()
                .reverse()
                .map((category) => {
                  return (
                    <Collapsible trigger={category}>
                      {Array.from(data.routes.get(category)!.keys())
                        // sort by month
                        .sort((a, b) => {
                          let months = [
                            "JANUARY",
                            "FEBRUARY",
                            "MARCH",
                            "APRIL",
                            "MAY",
                            "JUNE",
                            "JULY",
                            "AUGUST",
                            "SEPTEMBER",
                            "OCTOBER",
                            "NOVEMBER",
                            "DECEMBER",
                          ];
                          console.log(b);
                          console.log(months.indexOf(b));
                          return months.indexOf(a) - months.indexOf(a);
                        })
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
