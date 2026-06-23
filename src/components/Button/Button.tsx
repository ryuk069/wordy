type ButtonProps = {
  functionName?: () => void;
  iconName?: React.ReactNode;
};

const Button = ({iconName, functionName }: ButtonProps) => {
  const defaultButtonStyle = {
    borderWidth: "2px",
    borderRadius: "6px",
    padding: "4px",
    cursor: "pointer",
  };

  return (
    <button
      className="hover:scale-110 active:scale-95"
      onClick={functionName}
      style={defaultButtonStyle}
    >
      {iconName}
    </button>
  );
};

export default Button;

// dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white
