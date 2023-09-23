export function NavBarComponent() {
  const buttonStyle =
    "text-lg no-underline text-emerald-500 px-3 py-2 rounded-md mx-2 my-10 font-bold hover:bg-emerald-500 hover:rounded-lg hover:text-white transition-all duration-200";

  return (
    <header className="top-0 left-0 px-30 pb-5 flex flex-row sticky mb-10 justify-between align-middle shadow-sm ">
      <h2 className="text-2xl text-emerald-500 cursor-pointer font-extrabold">
        Carbon Tracker
      </h2>
      <nav className="gap-2">
        <a href="#" className={buttonStyle}>
          Home
        </a>
        <a href="#" className={buttonStyle}>
          Leaderboard
        </a>
        <a href="#" className={buttonStyle}>
          Tracker
        </a>
      </nav>
    </header>
  );
}
