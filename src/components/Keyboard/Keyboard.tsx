import { useEffect, useState, useCallback, useMemo } from "react";

const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const Keyboard = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const validKeys = useMemo(
    () => new Set(KEYBOARD_ROWS.flat()),
    []
  );

  const normalizeKey = useCallback((key: string): string => {
    if (key === "Backspace" || key === "Enter") return key;
    return key.toUpperCase();
  }, []);

  const handleKeyAction = useCallback((key: string) => {
    console.log("Key activated:", key);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = normalizeKey(e.key);
      if (!validKeys.has(key)) return;

      setActiveKey(key);
      handleKeyAction(key);
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
  }, [validKeys, normalizeKey, handleKeyAction]);

  const handleClick = (key: string) => {
    handleKeyAction(key);
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
                } ${isActive ? "bg-gray-200 text-black scale-95" : ""}`}
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