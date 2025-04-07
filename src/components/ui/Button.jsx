const Button = ({
  children,
  variant = "primary",
  disabled,
  full,
  type,
  className,
  onClick,
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg text-bodyM font-bold transition disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-purple text-white hover:bg-purple-hover disabled:bg-purple/25 disabled:text-white",
    secondary:
      "bg-white text-purple border border-purple hover:bg-light-purple disabled:bg-light-purple/25 disabled:text-purple/25 disabled:border-purple/50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        full ? "w-full" : ""
      } ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
