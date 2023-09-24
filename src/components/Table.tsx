import { useReactTable, ExpandedState } from "@tanstack/react-table";
import { useState } from "react";
import { Route } from "../model/Route.ts";

export function Table({ data }: { data: Map<string, Map<string, Route[]>> }) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  let columns = Array.from(data.keys()).map((key) => {
    return {
      header: key,
      columns:
        (data.get(key) &&
          Array.from(data.get(key)!.keys()).map((key2) => {
            return {
              header: key2,
              columns:
                (data.get(key2) &&
                  Array.from(data.get(key2)!.keys()).map((key3) => {
                    return {
                      header: key3,
                    };
                  })) ||
                [],
            };
          })) ||
        [],
    };
  });

  // use react tan table to display multilevel expanded table
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    debugTable: true,
  });
}
