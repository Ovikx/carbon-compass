import { default as Location } from "../assets/location.png";

interface Props {
  city1: string;
  city2: string;
  carbonUsage: number;
}

export default function MapRoute({ city1, city2, carbonUsage }: Props) {
  return (
    // <div className="flex flex-row space-between">
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="flex flex-col justify-center align-middle">
        <img src={Location} alt="location" className="w-12" />
        <p className="text-left">{city1}</p>
      </div>
      {/* <img src={Line} alt="line" /> */}
      <div className="flex justify-center align-middle">
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      </div>
      <div className="flex flex-col justify-center align-middle">
        <img src={Location} alt="location" className="w-12" />
        <p className="text-left">{city2}</p>
      </div>
      <p className="lg">{carbonUsage}</p>
    </div>
  );
}
