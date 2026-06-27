type TextProps = {
  size?: number;
  style?: string;
  content?: string;
  weight?: number;
};

const Text = ({
  size = 26,
  style = "sans-serif",
  weight = 100,
  content = "nothing was in the props",
}: TextProps) => {
  return (
    <p
      style={{
        fontSize: `${size}px`,
        fontFamily: `${style}`,
        fontWeight: `${weight}`,
      }}
    >
      {content}
    </p>
  );
};

export default Text;
