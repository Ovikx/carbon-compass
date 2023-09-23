import { Heatmap } from "../components/Heatmap";

export function Tracker() {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="left-align text-5xl font-bold ">
          Your Carbon Footprint Report
        </h1>
        <p className="left-align">Map</p>
        <p className="left-align">Breakdown</p>

        <Heatmap />
      </div>
    </div>
  );
}
