import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface Props {
  route: any;
  time: string;
  distance: number;
  carbonWaste: number;
  carbonSaved: number;
}

export default function RouteModal({
  route,
  time,
  distance,
  carbonWaste,
  carbonSaved,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>
          Trip on {time} of {distance} km wasting {carbonWaste} kg
        </Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>
        <p>This amount of Carbon could have been saved: {carbonSaved}</p>
        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
}
