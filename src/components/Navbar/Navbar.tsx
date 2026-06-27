import {
  CirclePlus,
  CircleQuestionMark,
  Menu,
  Moon,
  Settings,
} from "lucide-react";
import Button from "../Button/Button";

interface NavbarProps {
  howToPlayRef: React.RefObject<HTMLDivElement | null>;
  SettingsRef: React.RefObject<HTMLDivElement | null>;
}

const Navbar = ({ howToPlayRef, SettingsRef }: NavbarProps) => {
  
  function changeTheme() {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
  function howtoplay() {
    const element = howToPlayRef.current;

    if (!element) return;

    element.style.zIndex = "20";
    element.focus();
  }

  function settings() {
    const element = SettingsRef.current;

    if (!element) return;

    element.style.zIndex = "20";
    element.focus();
  }

  return (
    <nav className=" w-full h-full flex items-center justify-between">
      <Button iconName={<Menu />} />
      <div className="flex gap-2">
        <Button iconName={<CirclePlus />} />
        <Button iconName={<Moon />} functionName={changeTheme} />
        <Button iconName={<CircleQuestionMark />} functionName={howtoplay} />
        <Button iconName={<Settings />} functionName={settings} />
      </div>
    </nav>
  );
};

export default Navbar;
