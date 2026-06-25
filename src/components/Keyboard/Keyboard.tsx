import { useEffect, useCallback, useMemo } from "react";

type KeyboardProps = {
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
  positionRef: React.RefObject<[number, number]>;
  spaceAsEnter: boolean;
  numberOfLetters: number;
  playgroundRef: React.RefObject<HTMLDivElement | null>;
};

const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const Keyboard = ({
  activeKey,
  setActiveKey,
  positionRef,
  spaceAsEnter,
  numberOfLetters,
  playgroundRef,
}: KeyboardProps) => {
  const validKeys = useMemo(() => new Set(KEYBOARD_ROWS.flat()), []);

  const normalizeKey = useCallback(
    (key: string): string => {
      if (spaceAsEnter && key === " ") {
        return "Enter";
      }
      if (key === "Backspace" || key === "Enter") return key;
      return key.toUpperCase();
    },
    [spaceAsEnter],
  );

  const canPressKey = useCallback(
    (key: string) => {
      if (
        numberOfLetters === positionRef.current[1] &&
        key !== "Enter" &&
        key !== "Backspace"
      ) {
        return false;
      }

      if (positionRef.current[1] === 0 && key === "Backspace") {
        return false;
      }

      return true;
    },
    [numberOfLetters, positionRef],
  );

  useEffect(() => {
    const playground = playgroundRef.current;

    if (!playground) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // if (e.repeat) return;

      const key = normalizeKey(e.key);

      if (!validKeys.has(key)) return;

      if (!canPressKey(key)) return;

      setActiveKey(key);

      setTimeout(() => {
        setActiveKey(null);
      }, 150);
    };

    playground.addEventListener("keydown", handleKeyDown);

    return () => {
      playground.removeEventListener("keydown", handleKeyDown);
    };
  }, [validKeys, normalizeKey, canPressKey, setActiveKey, playgroundRef]);

  const handleClick = (key: string) => {
    if (!canPressKey(key)) {
      return;
    }
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 100);
  };

  return (
    <div className="flex flex-col items-center gap-3 p-2 keyboard-area">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-2"
          style={{ marginLeft: `${rowIndex * 20}px` }}
        >
          {row.map((key) => {
            const isSpecialKey = key === "Enter" || key === "Backspace";
            const isActive = activeKey === key;

            return (
              <div
                key={key}
                onClick={() => handleClick(key)}
                className={`border-2 h-16 flex items-center justify-center rounded-md font-medium select-none cursor-pointer active:scale-95 text-gray-500 hover:bg-gray-100 hover:text-black ${
                  isSpecialKey ? "w-23 text-sm" : "w-15"
                } ${isActive ? "bg-black dark:bg-white text-white dark:text-black scale-95" : ""}`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
