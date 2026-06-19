import { X } from "lucide-react";
import Button from "../Button/Button";

const Howtoplay = () => {
  function toggleHowToPlay() {
    const element = document.getElementsByClassName(
      "howtoplay",
    )[0] as HTMLElement;

    element.style.zIndex = "0";
  }
  return (
    <>
      <div className="howtoplay h-screen w-screen flex items-center justify-center absolute">
        <div className="h-8/10 w-4/10 border-2 bg-amber-600 p-5">
          <Button iconName={<X />} functionName={toggleHowToPlay} />
        </div>
      </div>
    </>
  );
};

export default Howtoplay;

{
  /* <div className="flex justify-between">
            <h2>How TO Play</h2>
            <X />
          </div>
          <p>Guess the Wordle in 6 tries.</p>
          <section>
            <ul>
              <li>Each guess must be a valid 5-letter word.</li>
              <li>
                The color of the tiles will change to show how close your guess
                was to the word.
              </li>
            </ul>
            <h3>Examples</h3>
            <div>
                <span className="border-2 border-gray-500">W</span>
                <span>O</span>
                <span>R</span>
                <span>D</span>
                <span>Y</span>
                <p>W is in the word and in the correct spot.</p>
            </div>
          </section> */
}
