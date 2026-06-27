import { X } from "lucide-react";
import Button from "../Button/Button";

interface HowtoplayProps {
  playgroundRef: React.RefObject<HTMLDivElement | null>;
  howToPlayRef: React.RefObject<HTMLDivElement | null>;
}

const Howtoplay = ({ playgroundRef, howToPlayRef }: HowtoplayProps) => {
  function toggleHowToPlay() {
    const element = howToPlayRef.current;

    if (!element) return;

    element.style.zIndex = "0";
    playgroundRef.current?.focus();
  }

  return (
    <>
      <div
        className="howtoplay h-screen w-screen flex items-center justify-center absolute bg-transparent"
        onClick={toggleHowToPlay}
        ref={howToPlayRef}
        tabIndex={0}
      >
        <div
          className="h-8/10 w-4/10 border-2 border-white p-5 bg-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button iconName={<X />} functionName={toggleHowToPlay} />
        </div>
      </div>
    </>
  );
};

export default Howtoplay;
