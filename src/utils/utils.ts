import { Route } from "../model/Route";

/**
 * Calculate the amount of carbon in kg wasted by taking this route
 */
export function calculateCarbonWasted(route: Route): number {
  let carbonSaved = 0;
  if (route.activities.length > 0) {
    const mostProbableActivity = getMostProbableActivity(route);
    if (mostProbableActivity === "IN_VEHICLE" || mostProbableActivity === "IN_PASSENGER_VEHICLE") {
      carbonSaved = 0;
    } else if (mostProbableActivity === "WALKING" || mostProbableActivity === "RUNNING" || mostProbableActivity === "CYCLING") {
      carbonSaved = getCarbonForCar(route.distance);
    } else if (mostProbableActivity == "IN_BUS") {
      carbonSaved = getCarbonForCar(route.distance) * .25;
    } else if (mostProbableActivity == "IN_TRAIN" || mostProbableActivity == "IN_SUBWAY") {
      carbonSaved = getCarbonForCar(route.distance) * .5;
    }
  }
  return carbonSaved;
}

export function getCarbonForCar(distance: number): number {
  return (distance/1000) * .192;
}

export function getMostProbableActivity(route: Route): string {
  let mostProbableActivity = "";
  let highestProbability = 0;
  for (const activity of route.activities) {
    if (activity.probability > highestProbability) {
      highestProbability = activity.probability;
      mostProbableActivity = activity.type;
    }
  }
  return mostProbableActivity;
}

