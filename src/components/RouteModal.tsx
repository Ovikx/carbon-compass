import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Route } from "../model/Route";

export default function RouteModal({
  start,
  end,
  startTime,
  endTime,
  distance,
  activities,
}: Route) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>
          Trip from {startTime} to {endTime} of {distance} km wasting{" "}
          {distance * 5} kg
        </Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>
        {/* <p>This amount of Carbon could have been saved: {carbonSaved}</p> */}
        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
}
