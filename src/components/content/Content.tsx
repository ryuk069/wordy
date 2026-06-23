import { useEffect } from "react";

type ContentProps = {
  numberOfRows?: number;
  numberOfLetters: number;
  currentPosition: [number, number];
  setCurrentPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
  activeKey: string | null;
};

const Content = ({
  numberOfRows = 6,
  numberOfLetters,
  activeKey,
  currentPosition,
  setCurrentPosition,
}: ContentProps) => {
  useEffect(() => {
  if (!activeKey) return;

  switch (activeKey) {
    case "Enter":
      console.log("Enter pressed");
      break;

    case "Backspace":
      console.log("Backspace pressed");
      break;


    default:
      console.log("Letter pressed:", activeKey);
      break;
  }
}, [activeKey]);
  
  return (
    <div
      className="gap-3 p-2 grid"
      style={{
        gridTemplateColumns: `repeat(${numberOfLetters}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: numberOfRows * numberOfLetters }).map(
        (_, index) => (
          <div
            key={index}
            className="border-2 h-13 w-13 flex items-center justify-center"
          ></div>
        ),
      )}
    </div>
  );
};

export default Content;
