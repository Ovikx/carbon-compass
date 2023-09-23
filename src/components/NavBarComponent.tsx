import { NavLink } from "react-router-dom";

export function NavBarComponent() {
    return (
        <header className="top-0 left-0 px-30 py-100 flex flex-row sticky mb-10 justify-between align-middle shadow-sm ">
            <h2 className="text-2xl text-emerald-500 cursor-pointer font-extrabold">Carbon Tracker</h2>
            <nav>
                <a href="#" className="text-lg no-underline text-emerald-500 px-3 py-15 rounded-md mx-0 my-10 font-bold hover:bg-emerald-500 hover:rounded-lg hover:text-white">Home</a>
                <a href="#" className="text-lg no-underline text-emerald-500 px-3 py-15 rounded-md mx-0 my-10 font-bold hover:bg-emerald-500 hover:rounded-lg hover:text-white">Leaderboard</a>
                <a href="#" className="text-lg no-underline text-emerald-500 px-3 py-15 rounded-md mx-0 my-10 font-bold hover:bg-emerald-500 hover:rounded-lg hover:text-white">Tracker</a>
            </nav>
        </header>
    )
}