import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/Content/Content";
import Keyboard from "./components/Keyboard/Keyboard";
import Howtoplay from "./components/Howtoplay/Howtoplay";
import { useEffect, useMemo, useRef, useState } from "react";
import Settings from "./components/Settings/Settings";
import easyWords from "./Words/easy.json";
import mediumWords from "./Words/medium.json";
import hardWords from "./Words/hard.json";

type Difficulty = "easy" | "medium" | "hard";

const WORDS = {
  easy: easyWords,
  medium: mediumWords,
  hard: hardWords,
};
function App() {

  const [difficulty] = useState<Difficulty>("easy");

  const [spaceAsEnter, setSpaceAsEnter] = useState<boolean>(false);

  const [activeKey, setActiveKey] = useState<string | null>(null);

  const [wordToGuess] = useState(() => {
    const words = WORDS[difficulty];

    return words[Math.floor(Math.random() * words.length)]!;
  });

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";

    document.documentElement.classList.toggle("dark", isDark);

    playgroundRef.current?.focus();
    console.log(wordToGuess);
  }, [wordToGuess]);

  useEffect(() => {
    console.log(renderCount.current++);
  }, [activeKey]);

  const renderCount = useRef<number>(0);

  const positionRef = useRef<[number, number]>([0, 0]);

  const playgroundRef = useRef<HTMLDivElement>(null);

  const howToPlayRef = useRef<HTMLDivElement>(null);

  const SettingsRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<string[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: wordToGuess.length }, () => ""),
    ),
  );

  const keyRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const validWords = useMemo(
    () => new Set(WORDS[difficulty]),
    [difficulty],
  );

  return (
    <>
      <Howtoplay playgroundRef={playgroundRef} howToPlayRef={howToPlayRef} />

      <Settings
        spaceAsEnter={spaceAsEnter}
        setSpaceAsEnter={setSpaceAsEnter}
        playgroundRef={playgroundRef}
        SettingsRef={SettingsRef}
      />

      <div
        className="w-full h-full flex flex-col dark:bg-black dark:text-white absolute z-15 bg-white"
        ref={playgroundRef}
        tabIndex={0}
      >
        <header className="w-full h-7/100 border-2 flex justify-center items-center px-5 py-2">
          <Navbar howToPlayRef={howToPlayRef} SettingsRef={SettingsRef} />
        </header>

        <main className="h-6/10 flex justify-center items-center">
          <Content
            activeKey={activeKey}
            numberOfLetters={wordToGuess.length}
            positionRef={positionRef}
            gridRef={gridRef}
            validWords={validWords}
            wordToGuess={wordToGuess}
            keyRefs={keyRefs}
          />
        </main>

        <hr />

        <footer className="flex-1 justify-center items-center flex">
          <Keyboard
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            spaceAsEnter={spaceAsEnter}
            positionRef={positionRef}
            numberOfLetters={wordToGuess.length}
            playgroundRef={playgroundRef}
            keyRefs={keyRefs}
          />
        </footer>
      </div>
    </>
  );
}

export default App;
