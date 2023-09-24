import { useContext, useEffect, useState } from "react";
import { Heatmap } from "../components/Heatmap";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { default as Environment } from "../assets/environment.svg";
import { default as Report } from "../assets/report.jpg";
import { FileContext } from "../components/FileContext";
import { Unzip } from "../read/Unzip";
import { CompositeData } from "../model/CompositeData";
import { Table } from "../components/Table";
import TopTrips from "../components/TopTrips";

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
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: "" }}>
          <div className="flex flex-col justify-center align-middle">
            <h1 className="left-align text-2xl font-bold pt-90  mb-5">
              Your Carbon Heatmap
            </h1>
            <div className="grid grid-cols-2 px-10 pt-10">
              <Heatmap compositeData={data} />
              <p>HIIIIIIIIIIIIIIIIIIIIIIIIIII</p>
            </div>
            <div className="left-align text-lg mt-12 ml-5">
              <TopTrips />
            </div>
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
            <h2 className="left-align">Table</h2>
            {!!data ? <Table data={data.routes}/> : <p>Loading...</p>}
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
