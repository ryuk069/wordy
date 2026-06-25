import { useEffect } from "react";

type ContentProps = {
  numberOfRows?: number;
  numberOfLetters: number;
  activeKey: string | null;
  positionRef: React.RefObject<[number, number]>;
  gridRef: React.RefObject<string[][]>;
  validWords: Set<string>;
  wordToGuess: string;
};

const Content = ({
  numberOfRows = 6,
  numberOfLetters,
  activeKey,
  positionRef,
  gridRef,
  validWords,
  wordToGuess,
}: ContentProps) => {
  function verifyGuess() {
    const arrOfLetters = wordToGuess.split("");
    const [row] = positionRef.current;
    // const grayStyle = {
    //   background: "gray",
    // };
    // const yellowStyle = {
    //   background: "yellow",
    // };
    // const greenStyle = {
    //   background: "green",
    // };

    for (let index = 0; index < numberOfLetters; index++) {
      const boxIndex = row * numberOfLetters + index;
      if (arrOfLetters.includes(gridRef.current?.[row]?.[index])) {
        if (gridRef.current?.[row]?.[index] === arrOfLetters[index]) {
          document
            .getElementsByClassName(`box-${boxIndex}`)[0]
            .classList.add("greenStyle");
        } else {
          document
            .getElementsByClassName(`box-${boxIndex}`)[0]
            .classList.add("orangeStyle");
        }
      } else {
        document
          .getElementsByClassName(`box-${boxIndex}`)[0]
          .classList.add("grayStyle");
      }
    }
  }

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
        } else {
          verifyGuess();
          if (guessedWord == wordToGuess) {
            console.log("congrats");
          } else {
            positionRef.current[0]++;
            positionRef.current[1] = 0;
          }
        }
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

    gridRef.current[row][col] = activeKey.toLowerCase();
    positionRef.current = [row, col + 1];
  }, [activeKey, numberOfLetters, positionRef, gridRef, wordToGuess]);

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
              className={`border-2 h-13 w-13 flex items-center justify-center uppercase font-bold text-lg box-${index}`}
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
