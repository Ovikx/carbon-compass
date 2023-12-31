import { useContext, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { default as Environment } from "../assets/environment.svg";
import { default as Report } from "../assets/report.jpg";
import { default as ReportGif } from "../assets/report.gif";
import { default as Exit } from "../assets/Close.png";
import { FileContext } from "../components/FileContext";
import { Unzip } from "../read/Unzip";
import { CompositeData } from "../model/CompositeData";
import ClipLoader from "react-spinners/ClipLoader";
import { HeatmapWrapper } from "../components/HeatmapWrapper";
import Collapsible from "react-collapsible";
import { Route } from "../model/Route";
import { addLeaderboardToUser, registerUser } from "../firebase/controller";
import { Dialog } from "@headlessui/react";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";
import {
  calculateCarbonSaved,
  flattenHierarchy,
  getCarbonForCar,
  getNameFromActivityName,
} from "../utils/utils";
import { Button } from "@mui/material";
import { BaseMap } from "../components/BaseMap";
import ModalMapRoute from "../components/ModalMapRoute";

const transition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

export function Tracker() {
  const [data, setData] = useState<CompositeData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [carbonWasted, setCarbonWasted] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [leaderboardValue, setLeaderboardValue] = useState("");
  const [route, setRoute] = useState<Route | null>(null);
  const fileContext = useContext(FileContext);

  useEffect(() => {
    if (fileContext.file) {
      Unzip.unzipLocationHistory(fileContext.file).then((res) => {
        setData(res);
        getCarbonSum(res.routes);
      });
    }
  }, [fileContext.file]);

  const getCarbonSum = (data: Map<string, Map<string, Route[]>>) => {
    let carbonSum = 0;
    let carbonWaste = 0;
    const flatten = flattenHierarchy(data);
    flatten.forEach((route) => {
      carbonSum += calculateCarbonSaved(route);
      carbonWaste +=
        getCarbonForCar(route.distance) - calculateCarbonSaved(route);
    });
    setCarbonSaved(carbonSum);
    setCarbonWasted(carbonWaste);
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
          <div className="left-align mt-96 ">
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
                    <div className="grid grid-cols-2">
                      <div className="pt-5 ">
                        <BaseMap selectedRoute={route} />
                      </div>
                      <div className="ml-10 ">
                        {route && <ModalMapRoute route={route} />}
                      </div>
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>
          {data ? (
            <div className="flex flex-col text-left text-xl gap-3 border border-emerald mx-80 pl-6 pt-5 pb-5 rounded-lg shadow-md">
              <div className="flex flex-row pt-2 pb-2 font-bold">
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
                                className="hover:bg-gray-100"
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
                                        className="ml-28 hover:bg-gray-100 py-2"
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
          className="text-3xl font-bold mb-5 flex"
          style={{
            backgroundImage: `url(${ReportGif})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="m-auto text-emerald-500 p-8 bg-opacity-25 bg-black w-screen">
            Thanks for taking part and being aware of your Carbon Footprint!
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={0.5}>
          <p className="text-3xl font-bold mb-10">
            Add a username to compare your Carbon Footprint with others!
          </p>
          {submitted ? (
            <p className="text-lg">You have been added!</p>
          ) : (
            <div className="flex flex-row justify-center align-items h-10 ">
              <TextField
                error={inputValue.length === 0}
                id="outlined-basic"
                label="Enter Username"
                variant="outlined"
                className="pr-10"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />

              <div className="flex flex-row justify-center align-middle py-4"></div>

              <TextField
                error={leaderboardValue.length === 0}
                id="outlined-basic"
                label="Leaderboard Invite"
                variant="outlined"
                value={leaderboardValue}
                onChange={(e) => {
                  setLeaderboardValue(e.target.value);
                }}
              />
              <div className="my-2 ml-5">
                <Button
                  variant="contained"
                  onClick={async () => {
                    await registerUser(inputValue, carbonSaved);
                    await addLeaderboardToUser(inputValue, leaderboardValue);
                    console.log("submitted");
                    setSubmitted(true);
                    console.log(submitted);
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </ParallaxLayer>
      </Parallax>
    </motion.div>
  );
}
