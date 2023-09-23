import { Heatmap } from "../components/Heatmap";

export function Tracker() {
  return (
    <div className="flex flex-col mt-36">
      <div>
        <section className="relative flex justify-center align-middle h-1/2">
          <h1 className="left-align text-5xl font-bold ">
            Your Carbon Footprint Report
          </h1>
        </section>

        <p className="left-align">Map</p>
        <p className="left-align">Breakdown</p>

        <Heatmap />
      </div>
    </div>
  );
}
