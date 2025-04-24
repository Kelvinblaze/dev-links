import { useEffect, useState } from "react";

const Input = ({
  label,
  type = "text",
  placeholder = "Placeholder",
  Icon,
  errorMessage = "",
  name = "",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Watcher for error messages on input
  useEffect(() => {
    setHasError(errorMessage !== "");
  }, [errorMessage]);

  return (
    <div className="space-y-1">
      <label
        htmlFor={label}
        className={`text-sm  ${hasError ? "text-red" : "text-dark-grey"}`}
      >
        {label}
      </label>

      <div
        className={`bg-white border-[1.5px] p-1 rounded-lg w-full  flex items-center px-4 transition-all ${
          hasError
            ? "border-red"
            : isFocused
            ? "border-purple shadow-glow"
            : "border-borders"
        }`}
      >
        {Icon && <Icon className="w-5 h-5 text-grey flex-none" />}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full py-2 px-4 focus:outline-none focus:border-none text-md font-normal placeholder:font-normal placeholder:text-dark-grey/50`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          value={value}
          name={name}
          autoComplete="off"
        />

        {hasError && (
          <span className="text-sm text-red mt-1 flex-none ">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
