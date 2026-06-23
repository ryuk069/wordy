import { useEffect, useCallback, useMemo } from "react";

type KeyboardProps = {
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
  spaceAsEnter: boolean;
};

const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const Keyboard = ({ activeKey, setActiveKey, spaceAsEnter }: KeyboardProps) => {
  const validKeys = useMemo(() => new Set(KEYBOARD_ROWS.flat()), []);

  const normalizeKey = useCallback((key: string): string => {
    if (spaceAsEnter && key === " ") {
      return "Enter";
    }
    if (key === "Backspace" || key === "Enter") return key;
    return key.toUpperCase();
  }, [spaceAsEnter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = normalizeKey(e.key);
      if (!validKeys.has(key)) return;

      setActiveKey(key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key);
      if (!validKeys.has(key)) return;

      setActiveKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [validKeys, normalizeKey, setActiveKey]);

  const handleClick = (key: string) => {
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
            const isSpecialKey =
              key === "Enter" || key === "Backspace";
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
