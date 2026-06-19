import {
  CirclePlus,
  CircleQuestionMark,
  Menu,
  Moon,
  Settings,
} from "lucide-react";
import Button from "../Button/Button";

const Navbar = () => {
  function changeTheme() {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  function howtoplay() {
    const element = document.getElementsByClassName(
      "howtoplay",
    )[0] as HTMLElement;

    element.style.zIndex = "20";
  }

    function settings() {
    const element = document.getElementsByClassName(
      "howtoplay",
    )[0] as HTMLElement;

    element.style.zIndex = "20";
  }

  return (
    <nav className=" w-full h-full flex items-center justify-between">
      <Button type="navicon" iconName={<Menu />} />
      <div className="flex gap-2">
        <Button type="navicon" iconName={<CirclePlus />} />
        <Button type="navicon" iconName={<Moon />} functionName={changeTheme} />
        <Button
          type="navicon"
          iconName={<CircleQuestionMark />}
          functionName={howtoplay}
        />
        <Button type="navicon" iconName={<Settings />} functionName={settings} />
      </div>
    </nav>
  );
};

export default Navbar;
