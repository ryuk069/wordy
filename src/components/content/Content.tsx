import { useCallback, useEffect, useRef } from "react";

type ContentProps = {
  numberOfRows?: number;
  numberOfLetters: number;
  activeKey: string | null;
  positionRef: React.RefObject<[number, number]>;
  gridRef: React.RefObject<string[][]>;
  validWords: Set<string>;
  wordToGuess: string;
  keyRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
};

const Content = ({
  numberOfRows = 6,
  numberOfLetters,
  activeKey,
  positionRef,
  gridRef,
  validWords,
  wordToGuess,
  keyRefs,
}: ContentProps) => {
  const boxRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const verifyGuess = useCallback(
    (row: number) => {
      const currentRow = gridRef.current[row];

      if (!currentRow) return;

      const remaining = new Map<string, number>();

      for (const letter of wordToGuess) {
        remaining.set(letter, (remaining.get(letter) ?? 0) + 1);
      }

      for (let index = 0; index < numberOfLetters; index++) {
        const letter = currentRow[index]!;
        const box = boxRefs.current[row * numberOfLetters + index];
        const key = keyRefs.current[letter];

        if (!box) continue;

        if (letter === wordToGuess[index]) {
          box.classList.add("greenStyle");

          remaining.set(letter, remaining.get(letter)! - 1);

          if (key) {
            key.classList.remove("orangeStyle", "grayStyle");
            key.classList.add("greenStyle");
          }
        }
      }

      for (let index = 0; index < numberOfLetters; index++) {
        const letter = currentRow[index]!;
        const box = boxRefs.current[row * numberOfLetters + index];
        const key = keyRefs.current[letter];

        if (!box) continue;

        if (box.classList.contains("greenStyle")) continue;

        const remainingCount = remaining.get(letter) ?? 0;

        if (remainingCount > 0) {
          box.classList.add("orangeStyle");
          remaining.set(letter, remainingCount - 1);

          if (
            key &&
            !key.classList.contains("greenStyle") &&
            !key.classList.contains("orangeStyle")
          ) {
            key.classList.add("orangeStyle");
          }
        } else {
          box.classList.add("grayStyle");

          if (
            key &&
            !key.classList.contains("greenStyle") &&
            !key.classList.contains("orangeStyle")
          ) {
            key.classList.add("grayStyle");
          }
        }
      }
    },
    [gridRef, keyRefs, numberOfLetters, wordToGuess],
  );

  useEffect(() => {
    if (!activeKey) return;

    const [row, col] = positionRef.current;
    const currentRow = gridRef.current[row];

    if (!currentRow) return;

    if (activeKey === "Enter") {
      if (col === numberOfLetters) {
        const guessedWord = currentRow.join("").toLowerCase();

        if (!validWords.has(guessedWord)) {
          console.log("Invalid word");
          return;
        }

        verifyGuess(row);

        if (guessedWord === wordToGuess) {
          console.log("congrats");
        } else {
          positionRef.current = [row + 1, 0];
        }
      }

      return;
    }

    if (activeKey === "Backspace") {
      if (col === 0) return;

      currentRow[col - 1] = "";
      positionRef.current = [row, col - 1];
      return;
    }

    if (col >= numberOfLetters) return;

    currentRow[col] = activeKey.toLowerCase();
    positionRef.current = [row, col + 1];
  }, [
    activeKey,
    numberOfLetters,
    positionRef,
    gridRef,
    wordToGuess,
    validWords,
    verifyGuess,
  ]);

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
              ref={(el) => {
                boxRefs.current[index] = el;
              }}
              className={`border-2 h-13 w-13 flex items-center justify-center uppercase font-bold text-lg box-${index}`}
            >
              {gridRef.current[row]?.[col] ?? ""}
            </div>
          );
        },
      )}
    </div>
  );
};

export default Content;
