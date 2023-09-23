import { Activity } from "./Activity";
import { Location } from "./Location";
export class Route {
    constructor(
        public start: Location,
        public end: Location,
        public startTimestamp: number,
        public endTimestamp: number,
        public distance: number,
        public activities: Activity[],
    ) {
        this.start = start;
        this.end = end;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
        this.distance = distance;
        this.activities = activities;
    }
}