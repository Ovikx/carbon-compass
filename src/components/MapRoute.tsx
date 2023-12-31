import { default as Location } from "../assets/location.png";
import { Route } from "../model/Route";
import { getCarbonForCar } from "../utils/utils";
import { useState, useMemo } from "react";
import { mapApiKey } from "./Heatmap";

interface Props {
  route: Route;
  selected: boolean;
  setSelectedRoute: (route: Route) => void;
}

export default function MapRoute({ route, setSelectedRoute, selected }: Props) {
  const [startCity, setStartCity] = useState("City");
  const [endCity, setEndCity] = useState("City");

  useMemo(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.start.latitude},${route.start.longitude}&key=${mapApiKey}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const city = data.results[0].address_components[3].long_name;
        setStartCity(city);
      });

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.end.latitude},${route.end.longitude}&key=${mapApiKey}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        const city = data.results[0].address_components[3].long_name;
        setEndCity(city);
      });
  }, [route]);

  return (
    // <div className="flex flex-row space-between">
    <button
      className={`py-2 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 hover:bg-gray-100  transition-all duration-300 hover:shadow-lg rounded-2xl ${
        selected ? "bg-gray-100 scale-105 shadow-lg" : ""
      }`}
      onClick={() => setSelectedRoute(route)}
    >
      <div className="flex flex-col ml-auto font-medium justify-center align-middle">
        <img src={Location} alt="location" className="w-12 ml-auto" />
        <p className="text-right">{startCity}</p>
      </div>
      <div className="flex justify-center align-middle">
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      </div>
      <div className="flex flex-col font-medium justify-center align-middle">
        <img src={Location} alt="location" className="w-12" />
        <p className="text-left">{endCity}</p>
      </div>
      <div className="flex flex-row font-extrabold my-auto">
        <p className=" flex lg  my-auto text-4xl ">
          {getCarbonForCar(route.distance).toFixed(2)}
        </p>
        <p className="text-2xl my-auto ml-2 mr-10 font-bold">kg</p>
      </div>
    </button>
  );
}
