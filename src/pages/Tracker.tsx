import { useContext, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { default as Environment } from "../assets/environment.svg";
import { default as Report } from "../assets/report.jpg";
import { default as Exit } from "../assets/Close.png";
import { FileContext } from "../components/FileContext";
import { Unzip } from "../read/Unzip";
import { CompositeData } from "../model/CompositeData";
import ClipLoader from "react-spinners/ClipLoader";
import { HeatmapWrapper } from "../components/HeatmapWrapper";
import Collapsible from "react-collapsible";
import { Route } from "../model/Route";
import { Dialog } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import { addLeaderboardToUser } from "../firebase/controller";
import { motion } from "framer-motion";
const transition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

export function Tracker() {
  const [data, setData] = useState<CompositeData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [route, setRoute] = useState<Route | null>(null);
  const fileContext = useContext(FileContext);

  useEffect(() => {
    if (fileContext.file) {
      Unzip.unzipLocationHistory(fileContext.file).then((res) => {
        setData(res);
      });
    }
  }, [fileContext.file]);

  type StringDict<T> = {
    [key: string]: T;
  };
  const dictionary: StringDict<string> = {
    IN_PASSENGER_VEHICLE: "Vehicle",
  };

  const convertActivity = (activity: string) => {
    return dictionary[activity];
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transition}
      className="mt-24 overflow-auto max-h-[400px]"
    >
      <Parallax pages={7}>
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
        <ParallaxLayer offset={1} speed={0.25} style={{ backgroundColor: "" }}>
          <div className="flex flex-col justify-center align-middle">
            <h1 className="left-align text-4xl font-bold pt-90  mb-5">
              Your Carbon Heatmap
            </h1>
            <HeatmapWrapper compositeData={data} />
          </div>
        </ParallaxLayer>
        {/* <ParallaxLayer offset={2} speed={0.5}>
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
        </ParallaxLayer> */}
        <ParallaxLayer offset={2} speed={0.25} factor={2}>
          <div className="left-align ">
            <h2 className="left-align text-4xl font-bold pb-5">
              View All Past Data
            </h2>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="p-6 mx-auto w-4/6 h-4/6 rounded bg-white justify-center align-middle">
                  <div className="flex flex-row justify-between">
                    <Dialog.Title>
                      <div>
                        <p className="text-3xl font-medium">
                          {route
                            ? new Date(route?.startTimestamp).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )
                            : "N/A"}{" "}
                          to{" "}
                          {route
                            ? new Date(route?.endTimestamp).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )
                            : "N/A"}{" "}
                        </p>
                      </div>
                    </Dialog.Title>
                    <div className="">
                      <button onClick={() => setIsOpen(false)}>
                        <img src={Exit} className="h-6 w-6 " />{" "}
                      </button>
                    </div>
                  </div>
                  <Dialog.Description>
                    <p className="flex flex-row align-middle mt-3">
                      <p className="mt-1">Carbon Footprint: </p>
                      <div className="ml-2">
                        <p className="font-extrabold text-2xl  flex flex-row">
                          {route ? route.distance * 5 : "N/A"}
                          <p className=" my-auto ml-2 font-medium">kg</p>
                        </p>
                      </div>
                    </p>
                    <p>
                      Activity:{" "}
                      {route
                        ? convertActivity(
                            route?.activities.reduce(
                              (maxObject, currentObject) => {
                                return currentObject.probability >
                                  maxObject.probability
                                  ? currentObject
                                  : maxObject;
                              },
                              { type: "", probability: -Infinity },
                            ).type,
                          ) +
                          " (" +
                          route?.activities
                            .reduce(
                              (maxObject, currentObject) => {
                                return currentObject.probability >
                                  maxObject.probability
                                  ? currentObject
                                  : maxObject;
                              },
                              { type: "", probability: -Infinity },
                            )
                            .probability.toPrecision(2) +
                          "% Confident)"
                        : "N/A"}
                    </p>
                    <p>Trip Distance: {route ? route.distance : "N/A"} km</p>
                    <p>
                      Duration:{" "}
                      {route
                        ? Math.floor(
                            (route?.endTimestamp - route?.startTimestamp) /
                              (1000 * 60 * 60 * 24),
                          )
                        : "N/A"}{" "}
                      days{" "}
                      {route
                        ? Math.floor(
                            (route?.endTimestamp -
                              route?.startTimestamp / (1000 * 60 * 60)) %
                              24,
                          )
                        : "N/A"}{" "}
                      hours.
                    </p>
                  </Dialog.Description>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
          {!!data ? (
            <div className="flex flex-col text-left text-xl gap-3 border border-emerald mx-80 pl-6 pt-5 pb-5 rounded-lg shadow-sm">
              <div className="flex flex-row pt-2 pb-2 ">
                <h2>
                  Year &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Month
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Record
                </h2>
              </div>
              {Array.from(data.routes.keys())
                .sort()
                .reverse()
                .map((category) => {
                  return (
                    <Collapsible trigger={category}>
                      {Array.from(data.routes.get(category)!.keys())
                        // sort by month
                        .sort((a, b) => {
                          const months = [
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
                          return (
                            months.indexOf(a.toUpperCase()) -
                            months.indexOf(b.toUpperCase())
                          );
                        })
                        .map((subcategory) => {
                          return (
                            <div className="ml-20">
                              <Collapsible
                                key={Math.random()}
                                trigger={
                                  subcategory.charAt(0).toUpperCase() +
                                  subcategory.toLowerCase().slice(1)
                                }
                              >
                                {data.routes
                                  .get(category)!
                                  .get(subcategory)!
                                  .sort((a, b) => {
                                    return b.startTimestamp - a.startTimestamp;
                                  })
                                  .map((route: Route) => {
                                    return (
                                      <div
                                        className="ml-28"
                                        onClick={() => {
                                          setRoute(route);
                                          setIsOpen(true);
                                          console.log(route);
                                        }}
                                      >
                                        <div className="flex flex-row hover:cursor-pointer">
                                          <h3 className="p-2">
                                            {new Date(
                                              route.startTimestamp,
                                            ).toLocaleString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}{" "}
                                            to{" "}
                                            {new Date(
                                              route.endTimestamp,
                                            ).toLocaleString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </h3>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </Collapsible>
                            </div>
                          );
                        })}
                    </Collapsible>
                  );
                })}
            </div>
          ) : (
            <ClipLoader color={"#000000"} size={75} className="my-20" />
          )}
        </ParallaxLayer>
        <ParallaxLayer
          offset={4}
          speed={0.5}
          className="text-3xl font-bold mb-5"
        >
          Thanks for taking part and being aware of your Carbon Footprint!
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={0.5}>
          <p className="text-3xl font-bold mb-10">
            Add a username to compare your Carbon Footprint with others!
          </p>
          <TextField
            error={inputValue.length === 0}
            id="outlined-basic"
            label="Enter Username"
            variant="outlined"
            value={inputValue}
            onSubmit={() => {
              setUsername(inputValue);
              // addLeaderboardToUser(username, leaderboard);
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </ParallaxLayer>
      </Parallax>
    </motion.div>
  );
}
