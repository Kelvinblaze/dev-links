import { TbLoader3 } from "react-icons/tb";

const Button = ({
  children,
  variant = "primary",
  disabled,
  full,
  type,
  className,
  onClick,
  loading,
  ...rest
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold transition disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-purple text-white hover:bg-purple-hover disabled:bg-purple/25 disabled:text-white",
    secondary:
      "bg-white text-purple border border-purple hover:bg-light-purple disabled:bg-light-purple/25 disabled:text-purple/25 disabled:border-purple/50",
  };

  return (
    <button
      {...rest}
      className={`${baseStyles} ${variants[variant]} ${
        full ? "w-full" : ""
      } ${className}`}
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <TbLoader3 className="animate-spin text-xl" />
          <span className="italic">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
