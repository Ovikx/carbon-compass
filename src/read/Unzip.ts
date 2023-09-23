// unzip Location History zip archive from Google Takeout

import * as zip from "@zip.js/zip.js";
import { Deserialize } from "./Deserialize.ts";
import { Location } from "../model/Location.ts";
import { Route } from "../model/Route.ts";

export class Unzip {
    public static async unzipLocationHistory(blob: Blob): Promise<{locations: Location[], routes: Map<string, Map<string, Route[]>>}>{
        // unzip using zip.js using filereader
        const reader = new zip.ZipReader(new zip.BlobReader(blob));
        const entries = await reader.getEntries();
        const locationPath = entries.find((entry) => entry.filename === "Takeout/Location History/Records.json");
        const possibleLocation = (await locationPath?.getData?.(new zip.TextWriter()));
        
        let locations: Location[] = [];

        if (possibleLocation) {
            locations = Deserialize.deserializeLocationRecords(possibleLocation);
        }
        
        let routes = new Map<string, Map<string, Route[]>>();

        const routePaths = entries.filter((entry) => entry.filename.startsWith("Takeout/Location History/Semantic Location History/"));
    
        for (const routePath of routePaths) {
            const possibleRoute = (await routePath?.getData?.(new zip.TextWriter()));
            if (possibleRoute) {
                const route = Deserialize.deserializeRouteRecords(possibleRoute);
                const date = routePath.filename.split("/")[4].split("_");
                const year = date[0];
                const month = date[1];
                if (!routes.has(year)) {
                    routes.set(year, new Map<string, Route[]>());
                }
                if (!routes.get(year)?.has(month)) {
                    routes.get(year)?.set(month, []);
                }
                routes.get(year)?.get(month)?.push(...route);
            }
        }

        return {
            "locations": locations,
            "routes": routes,
        };
    }
}

