import MapRoute from "./MapRoute";

export default function TopTrips() {
  return (
    <>
      <div className="flex flex-col">
        <h2>Your 3 Biggest Trips</h2>
        <MapRoute city1="San Francisco" city2="Los Angeles" carbonUsage={100} />
        <MapRoute city1="Houston" city2="Boston" carbonUsage={100} />
        <MapRoute city1="Neverland" city2="Dumbledore" carbonUsage={100} />
      </div>
    </>
  );
}
