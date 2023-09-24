import { FileUploader } from "../components/FileUploader";
import { default as Trees } from "../assets/trees.svg";

export function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Trees})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "90vh",
          width: "100vw",
          position: "absolute",
          marginTop: "76px",
          top: 0,
          left: 0,
        }}
      >
        <div className="mt-40">
          <div className="text-gray-500 pt-10 ">
            <div className="flex flex-col absolute left-10 pl-7 ml-10">
              <p className="text-4xl text-black font-medium text-left">
                Track your Carbon Footprint
              </p>
              <p className="text-4xl  text-green-500 font-bold text-left mt-2">
                Smarter
              </p>
            </div>
          </div>
          <input type = "file" id = "locationData" hidden/>
          <label className="flex transition-all flex-row w-40 mt-28  ml-98 text-lg rounded-lg p-1 text-white font-semibold hover:bg-green-700 bg-green-600" htmlFor = "locationData" >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="rounded-lg hover:bg-green-700 fill-white"
              height="32"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
            </svg>
            <p className = "pr-1">Upload File!</p>
          </label>
        </div>
      </div>

    </>
  );
}
