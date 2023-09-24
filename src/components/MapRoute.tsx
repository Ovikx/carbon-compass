import { default as Location } from "../assets/location.png";
import { default as Line } from "../assets/line.png";

interface Props {
  city1: string;
  city2: string;
  carbonUsage: number;
}

export default function MapRoute({ city1, city2, carbonUsage }: Props) {
  return (
    <div className="flex flex-row space-between">
      <div className="flex flex-col justify-center align-middle">
        <img src={Location} alt="location" />
        <p>{city1}</p>
      </div>
      <img src={Line} alt="line" />
      <div className="flex flex-col justify-center align-middle">
        <img src={Location} alt="location" />
        <p>{city2}</p>
      </div>
      <p className="lg">{carbonUsage}</p>
    </div>
  );
}
