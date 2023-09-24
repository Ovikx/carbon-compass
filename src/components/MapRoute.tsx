import { default as Location } from "../assets/location.png";
import { Route } from "../model/Route";
import { calculateCarbonWasted } from "../utils/utils";

interface Props {
  route: Route;
  selected: boolean;
  setSelectedRoute: (route: Route) => void;
}

export default function MapRoute({ route, setSelectedRoute, selected }: Props) {
  return (
    // <div className="flex flex-row space-between">
    <button
      className={`py-2 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 hover:bg-gray-200  transition-all rounded-2xl ${
        selected ? "bg-gray-200 scale-105" : ""
      }`}
      onClick={() => setSelectedRoute(route)}
    >
      <div className="flex flex-col ml-auto justify-center align-middle">
        <img src={Location} alt="location" className="w-12 ml-auto" />
        <p className="text-right">Start</p>
      </div>
      <div className="flex justify-center align-middle">
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      </div>
      <div className="flex flex-col justify-center align-middle">
        <img src={Location} alt="location" className="w-12" />
        <p className="text-left">End</p>
      </div>
      <div className="flex flex-row font-extrabold ">
        <p className=" flex lg  my-auto text-4xl ">
          {calculateCarbonWasted(route).toFixed(2)}
        </p>
        <p className="text-2xl my-auto ml-2 mr-10 font-bold">kg</p>
      </div>
    </button>
  );
}
