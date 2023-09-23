// read in Google Location Takeout data and deserialize it
// into a list of Location objects

import * as fs from 'fs';
import { Location } from '../model/Location.ts';
import { Route } from '../model/Route.ts';
import { Activity } from '../model/Activity.ts';

export class Deserialize {
  public static deserializeLocationRecords(path: string): Location[] {
    const recordsContents = fs.readFileSync(path, 'utf8');
    const recordsJson = JSON.parse(recordsContents);
    const locations = recordsJson.locations;

    const locationArr = [];

    for (const location of locations) {
      const latitudeE7 = location.latitudeE7;
      const longitudeE7 = location.longitudeE7;

      if (latitudeE7 && longitudeE7) {
        const latitude = latitudeE7 / 10000000;
        const longitude = longitudeE7 / 10000000;

        locationArr.push(new Location(latitude, longitude));
      }
    }
    return locationArr;
  }

  public static deserializeRouteRecords(path: string): Route[] {
    const routesContents = fs.readFileSync(path, 'utf8');
    const routesJson = JSON.parse(routesContents);
    const timelineObjects = routesJson.timelineObjects;

    const routeArr = [];

    for (const timeline of timelineObjects) {
        if ('activitySegment' in timeline) {
            const activitySegment = timeline.activitySegment;
            const startLocation = activitySegment.startLocation;
            const endLocation = activitySegment.endLocation;
            
            const route = new Route(
                new Location(startLocation.latitudeE7 / 10000000, startLocation.longitudeE7 / 10000000),
                new Location(endLocation.latitudeE7 / 10000000, endLocation.longitudeE7 / 10000000),
                activitySegment.duration.startTimestampMs,
                activitySegment.duration.endTimestampMs,
                activitySegment.distance,
                activitySegment.activities.map(
                    (activity: any) => new Activity(activity.activityType, activity.probability),
                ),
            );

            routeArr.push(route);
      }
    }
    
    return routeArr;
  }
}