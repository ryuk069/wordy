import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/content/Content";
import Keyboard from "./components/Keyboard/Keyboard";
import Howtoplay from "./components/Howtoplay/Howtoplay";
import { useEffect, useState } from "react";
import Settings from "./components/Settings/Settings";

function App() {
  const words: string[] = [
    "glue",
    "present",
    "wish",
    "cloud",
    "carpenter",
    "complain",
    "celebrate",
    "learned",
    "party",
    "stone",
    "station",
    "value",
    "grubby",
    "crabby",
    "kind",
    "whole",
    "envy",
    "trouble",
    "search",
  ];

  const [wordToGuess] = useState<string>(
    () => words[Math.floor(Math.random() * words.length)],
  );
  const [spaceAsEnter, setSpaceAsEnter] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0, 0,
  ]);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  console.log("rendered");
  

  return (
    <>
      <Howtoplay />
      <Settings 
      spaceAsEnter={spaceAsEnter}
      setSpaceAsEnter={setSpaceAsEnter}
      />

      <div className="w-full h-full flex flex-col dark:bg-black dark:text-white absolute z-15 bg-white">
        <header className="w-full h-7/100 border-2 flex justify-center items-center px-5 py-2">
          <Navbar />
        </header>
        <main className="h-6/10 flex justify-center items-center">
          <Content
            activeKey={activeKey}
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
            numberOfLetters={wordToGuess.length}
          ></Content>
        </main>
        <hr />
        <footer className=" flex-1 justify-center items-center flex">
          <Keyboard
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            spaceAsEnter={spaceAsEnter}
          ></Keyboard>
        </footer>
      </div>
    </>
  );
}

export default App;
