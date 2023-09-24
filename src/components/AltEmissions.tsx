import { Route } from "../model/Route";
import { getCarbonForCar } from "../utils/utils";

type TransportType = "IN_BUS" | "IN_TRAIN";

interface Props {
  route: Route | null;
  transportType: TransportType;
}

const factors: Record<TransportType, number> = {
  IN_BUS: 0.25,
  IN_TRAIN: 0.5,
};

function AltEmissions(props: Props) {
  return (
    <div className="flex flex-row justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="128"
        viewBox="0 -960 960 960"
        width="128"
      >
        <path d="M240-120q-17 0-28.5-11.5T200-160v-82q-18-20-29-44.5T160-340v-380q0-83 77-121.5T480-880q172 0 246 37t74 123v380q0 29-11 53.5T760-242v82q0 17-11.5 28.5T720-120h-40q-17 0-28.5-11.5T640-160v-40H320v40q0 17-11.5 28.5T280-120h-40Zm242-640h224-448 224Zm158 280H240h480-80Zm-400-80h480v-120H240v120Zm100 240q25 0 42.5-17.5T400-380q0-25-17.5-42.5T340-440q-25 0-42.5 17.5T280-380q0 25 17.5 42.5T340-320Zm280 0q25 0 42.5-17.5T680-380q0-25-17.5-42.5T620-440q-25 0-42.5 17.5T560-380q0 25 17.5 42.5T620-320ZM258-760h448q-15-17-64.5-28.5T482-800q-107 0-156.5 12.5T258-760Zm62 480h320q33 0 56.5-23.5T720-360v-120H240v120q0 33 23.5 56.5T320-280Z" />
      </svg>
      <div className="flex flex-col">
        <p className="font-bold text-4xl pl-5 pt-3">
          CO<sub>2</sub> Emissions
        </p>
        <p className="font-bold pt-3 text-3xl">
          {(props.route
            ? getCarbonForCar(props.route.distance) *
              factors[props.transportType]
            : 39
          ).toFixed(2)}{" "}
          KG
        </p>
      </div>
      <div className="pl-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="green"
          height="120"
          viewBox="0 -960 960 960"
          width="105"
        >
          <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
        </svg>
      </div>
    </div>
  );
}

export default AltEmissions;
