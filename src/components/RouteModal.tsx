import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Route } from "../model/Route";

export default function RouteModal({
  start,
  end,
  startTimestamp,
  endTimestamp,
  distance,
  activities,
}: Route) {
  const [isOpen, setIsOpen] = useState(false);
  const startTime = new Date(startTimestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const endTime = new Date(endTimestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const durationInMillis = endTimestamp - startTimestamp;
  const hours = Math.floor((durationInMillis / (1000 * 60 * 60)) % 24);
  const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24));
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <div className="flex flex-row justify-between">
          <Dialog.Title>
            Trip from {startTime} to {endTime} for a total of {days} days and{" "}
            {hours} hours.
            {distance * 5} kg
          </Dialog.Title>
          <button onClick={() => setIsOpen(false)}>
            <img src="../assets/Close.png" />{" "}
          </button>
        </div>
        <Dialog.Description>
          <p>Distance: {distance} km wasting </p>
        </Dialog.Description>
        {/* <p>This amount of Carbon could have been saved: {carbonSaved}</p> */}
      </Dialog.Panel>
    </Dialog>
  );
}
