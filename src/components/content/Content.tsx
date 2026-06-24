import { useEffect } from "react";

type ContentProps = {
  numberOfRows?: number;
  numberOfLetters: number;
  activeKey: string | null;
  positionRef: React.RefObject<[number, number]>;
  gridRef: React.RefObject<string[][]>;
  validWords: Set<string>;
};

const Content = ({
  numberOfRows = 6,
  numberOfLetters,
  activeKey,
  positionRef,
  gridRef,
  validWords
}: ContentProps) => {
  useEffect(() => {
    if (!activeKey) return;
    if (!positionRef.current || !gridRef.current) return;

    const [row, col] = positionRef.current;

    if (activeKey === "Enter") {
      if (positionRef.current[1] === numberOfLetters) {
        const guessedWord = gridRef.current[row].join("").toLowerCase();

        if (!validWords.has(guessedWord)) {
          console.log("Invalid word");
          return;
        }

        console.log("Valid word");
      }

      return;
    }

    if (activeKey === "Backspace") {
      if (col === 0) return;

      gridRef.current[row][col - 1] = "";
      positionRef.current = [row, col - 1];
      return;
    }

    if (col >= numberOfLetters) return;

    gridRef.current[row][col] = activeKey;
    positionRef.current = [row, col + 1];
  }, [activeKey, numberOfLetters, positionRef, gridRef]);

  return (
    <div
      className="grid gap-3 p-2"
      style={{
        gridTemplateColumns: `repeat(${numberOfLetters}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: numberOfRows * numberOfLetters }).map(
        (_, index) => {
          const row = Math.floor(index / numberOfLetters);
          const col = index % numberOfLetters;

          return (
            <div
              key={index}
              className="border-2 h-13 w-13 flex items-center justify-center uppercase font-bold text-lg"
            >
              {gridRef.current?.[row]?.[col] ?? ""}
            </div>
          );
        },
      )}
    </div>
  );
};

export default Content;
