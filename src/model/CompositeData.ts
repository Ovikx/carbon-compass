import { Route } from "./Route";
import { Location } from "./Location";

export interface CompositeData {
  locations: Location[];
  routes: Map<string, Map<string, Route[]>>;
}
