interface Props {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

export function RouteItem(props: Props) {
  return (
    <button className="flex flex-row gap-2">
      <p>test</p>
    </button>
  );
}
