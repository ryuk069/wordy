type ContentProps = {
  numberOfRows?: number;
  numberOfLetters?: number;
};

const Content = ({
  numberOfRows = 6,
  numberOfLetters = 8,
}: ContentProps) => {

  

  return (
    <div
      className="gap-3 p-2 grid"
      style={{
        gridTemplateColumns: `repeat(${numberOfLetters}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: numberOfRows * numberOfLetters }).map(
        (_, index) => (
          <div
            key={index}
            className="border-2 h-13 w-13 flex items-center justify-center"
          >
          </div>
        )
      )}
    </div>
  );
};

export default Content;