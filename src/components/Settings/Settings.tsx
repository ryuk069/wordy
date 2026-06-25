import type { SetStateAction } from "react";
import Button from "../Button/Button";
import { Space, X } from "lucide-react";

interface settingsprops {
  spaceAsEnter: boolean;
  setSpaceAsEnter: React.Dispatch<SetStateAction<boolean>>;
  playgroundRef: React.RefObject<HTMLDivElement | null>;
  SettingsRef: React.RefObject<HTMLDivElement | null>;
}

const Settings = ({ spaceAsEnter, setSpaceAsEnter, playgroundRef, SettingsRef }: settingsprops) => {
  
  function toggleSettings() {
    const element = SettingsRef.current;

    if (!element) return;

    element.style.zIndex = "0";
    playgroundRef.current?.focus();
  }

  function toggleSpaceBarSettings() {
    setSpaceAsEnter(!spaceAsEnter);
  }

  return (
    <div className="settings h-screen w-screen flex items-center justify-center absolute" ref={SettingsRef} tabIndex={0}>
      <div className="h-8/10 w-4/10 border-2 bg-amber-600 p-5">
        <Button iconName={<X />} functionName={toggleSettings} />
        <Button iconName={<Space />} functionName={toggleSpaceBarSettings} />
      </div>
    </div>
  );
};

export default Settings;
