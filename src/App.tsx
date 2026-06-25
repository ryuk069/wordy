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

function App() {
  const WORDS = {
    easy: easyWords,
    medium: mediumWords,
    hard: hardWords,
  };

  const [difficulty] = useState<Difficulty>("easy");

  const [spaceAsEnter, setSpaceAsEnter] = useState<boolean>(false);

  const [activeKey, setActiveKey] = useState<string | null>(null);

  const [wordToGuess] = useState(() => {
    const words = WORDS[difficulty];

    return words[Math.floor(Math.random() * words.length)];
  });

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    playgroundRef.current?.focus();
  }, []);

  // const renderCount = useRef<number>(1);

  const positionRef = useRef<[number, number]>([0, 0]);

  const playgroundRef = useRef<HTMLDivElement>(null);

  const HowtoplayRef = useRef<HTMLDivElement>(null);

  const SettingsRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<string[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: wordToGuess.length }, () => ""),
    ),
  );

  const validWords = useMemo(() => new Set(WORDS[difficulty]), [difficulty]);


  return (
    <>
      <Howtoplay playgroundRef={playgroundRef} HowtoplayRef={HowtoplayRef} />

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
          <Navbar HowtoplayRef={HowtoplayRef} SettingsRef={SettingsRef} />
        </header>

        <main className="h-6/10 flex justify-center items-center">
          <Content
            activeKey={activeKey}
            numberOfLetters={wordToGuess.length}
            positionRef={positionRef}
            gridRef={gridRef}
            validWords={validWords}
            wordToGuess={wordToGuess}
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
          />
        </footer>
      </div>
    </>
  );
}

export default App;
