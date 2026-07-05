type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-xl
        bg-blue-600
        hover:bg-blue-500
        transition-all
        duration-200
        px-5
        py-3
        font-semibold
        text-white
        shadow-md
      "
    >
      {children}
    </button>
  );
}