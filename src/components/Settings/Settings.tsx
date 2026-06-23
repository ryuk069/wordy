import type { SetStateAction } from "react";
import Button from "../Button/Button";
import { Space, X } from "lucide-react";

interface settingsprops {
  spaceAsEnter: boolean;
  setSpaceAsEnter: React.Dispatch<SetStateAction<boolean>>;
}

const Settings = ({ spaceAsEnter, setSpaceAsEnter }: settingsprops) => {
  function toggleSettings() {
    const element = document.getElementsByClassName(
      "settings",
    )[0] as HTMLElement;

    element.style.zIndex = "0";
  }

  function toggleSpaceBarSettings() {
    setSpaceAsEnter(!spaceAsEnter);
  }

  return (
    <div className="settings h-screen w-screen flex items-center justify-center absolute">
      <div className="h-8/10 w-4/10 border-2 bg-amber-600 p-5">
        <Button iconName={<X />} functionName={toggleSettings} />
        <Button iconName={<Space />} functionName={toggleSpaceBarSettings} />
      </div>
    </div>
  );
};

export default Settings;
