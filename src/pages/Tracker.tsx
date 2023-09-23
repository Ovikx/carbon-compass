import { useContext, useEffect, useState } from "react";
import { Heatmap } from "../components/Heatmap";
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
    <div className="flex flex-col mt-36">
      <div>
        <section className="relative flex justify-center align-middle h-screen">
          <h1 className="left-align text-5xl font-bold ">
            Your Carbon Footprint Report
          </h1>
          <div>
            <h2>Map</h2>
            <Heatmap compositeData={data} />
          </div>
          <div>
            <p className="left-align">Breakdown</p>
            <p className="left-align">Point 1</p>
            <p className="left-align">Point 2</p>
          </div>
          <div>
            <h2 className="left-align">Table</h2>
          </div>
        </section>
      </div>
    </div>
  );
}
