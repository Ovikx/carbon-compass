import { useContext, useEffect, useState } from "react";
import { Heatmap } from "../components/Heatmap";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { default as Environment } from "../assets/environment.svg";
import { FileContext } from "../components/FileContext";
import { Unzip } from "../read/Unzip";
import { CompositeData } from "../model/CompositeData";

export function Tracker() {
  const [data, setData] = useState<CompositeData | null>(null);
  const fileContext = useContext(FileContext);

  useEffect(() => {
    if (fileContext.file) {
      Unzip.unzipLocationHistory(fileContext.file).then((res) => {
        setData(res);
      });
    }
  }, [fileContext]);

  return (
    <div className="mt-40">
      <Parallax pages={4}>
        <ParallaxLayer speed={2} factor={1}>
          <div className="flex flex-row justify-center align-middle">
            <div>
              <h1 className="left-align text-5xl font-bold">
                Your Carbon Footprint Report
              </h1>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <div className="left-align">
            <h2>Map</h2>
            <Heatmap compositeData={data} />
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
                // marginTop: "76px",
                // top: 0,
                // left: 0,
              }}
            ></div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.25}>
          <div className="left-align pointer-events-none">
            <h2 className="left-align">Table</h2>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
