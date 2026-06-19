const KEYBOARD_ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const Keyboard = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-2"
          style={{
            // stagger each row slightly, like a real keyboard
            marginLeft: `${rowIndex * 20}px`,
          }}
        >
          {row.map((key) => {
            const isSpecialKey = key === "Enter" || key === "Backspace";

            return (
              <div
                key={key}
                className={`border-2 h-16 flex items-center justify-center rounded-md font-medium select-none cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-black ${
                  isSpecialKey ? "w-23 text-sm" : "w-15"
                }`}
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