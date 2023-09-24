import { Route } from "../model/Route";
import Collapsible from "react-collapsible";

export function Category({
  data,
}: {
  data: Map<string, Map<string, Route[]>>;
}) {
  return (
    <div>
      {Array.from(data.keys())
        .sort()
        .reverse()
        .map((category) => {
          return (
            <Collapsible trigger={category}>
              {Array.from(data.get(category)!.keys())
                .sort()
                .map((subcategory) => {
                  return (
                    <Collapsible trigger={subcategory}>
                      {data
                        .get(category)!
                        .get(subcategory)!
                        .sort((a, b) => {
                          return b.startTimestamp - a.startTimestamp;
                        })
                        .map((route: Route) => {
                          return (
                            <div>
                              <h3>{route.startTimestamp}</h3>
                              <p>{route.endTimestamp}</p>
                            </div>
                          );
                        })}
                    </Collapsible>
                  );
                })}
            </Collapsible>
          );
        })}
    </div>
  );
}
