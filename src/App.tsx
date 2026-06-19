import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Content from "./components/content/Content";
import Keyboard from "./components/Keyboard/Keyboard";
import Howtoplay from "./components/Howtoplay/Howtoplay";
import { useEffect } from "react";
import Settings from "./components/Settings/Settings";

function App() {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <>
      <Howtoplay />
      <Settings />

      <div className="w-full h-full flex flex-col dark:bg-black dark:text-white absolute z-15 bg-white">
        <header className="w-full h-7/100 border-2 flex justify-center items-center px-5 py-2">
          <Navbar />
        </header>
        <main className="h-6/10 flex justify-center items-center">
          <Content></Content>
        </main>
        <hr/>
        <footer className=" flex-1 justify-center items-center flex">
          <Keyboard></Keyboard>
        </footer>
      </div>
    </>
  );
}

export default App;
