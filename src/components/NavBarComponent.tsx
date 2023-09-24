import { NavLink } from "react-router-dom";

export function NavBarComponent() {
  return (
    <nav className="fixed top-0 left-0 w-full ">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center mt-5">
          <h2 className="text-2xl text-emerald-400 cursor-pointer font-extrabold">
            Carbon Compass
          </h2>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className="text-lg text-green-500 font-bold hover:text-emerald-700"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leaderboard"
                className="text-lg text-green-500 font-bold hover:text-green-700"
              >
                Leaderboard
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/tracker"
                className="text-lg text-green-500 font-bold hover:text-green-700"
              >
                Tracker
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
