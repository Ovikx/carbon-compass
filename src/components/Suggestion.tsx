interface Props {
  children: React.ReactNode;
  title: string;
}

export function Suggestion({ children, title }: Props) {
  return (
    <div className="mx-auto flex flex-col gap-5 justify-around w-9/12 shadow-md rounded-xl p-3 hover:bg-gray-100">
      <h1 className="font-bold text-4xl">{title}</h1>
      <div className="flex flex-row pb-6">{children}</div>
    </div>
  );
}
