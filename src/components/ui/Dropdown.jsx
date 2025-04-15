import { useState } from "react";

import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import iconMap from "../../utils/iconMap";

const DropDown = ({
  label,
  placeholder = "Select an option",
  Icon,
  name = "",
  value,
  onChange,
  options = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (option) => {
    onChange({ target: { ...option, name, value: option.value } });
    setIsActive(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="space-y-1 relative">
      {label && (
        <label htmlFor={name} className="text-sm text-dark-grey">
          {label}
        </label>
      )}

      <div className="space-y-3">
        <div
          tabIndex={0}
          onClick={() => setIsActive((prev) => !prev)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // delay to allow click on option
          className={`bg-white border-[1.5px] rounded-lg w-full flex items-center space-x-3 px-4 py-3 transition-all cursor-pointer ${
            isFocused || isActive
              ? "border-purple shadow-glow"
              : "border-borders"
          }`}
        >
          {Icon && <Icon className="w-5 h-5 text-grey mr-2" />}
          <span className={`text-md text-dark-grey w-full`}>
            {selectedLabel || placeholder}
          </span>

          {isActive ? (
            <RxChevronUp className="text-purple" />
          ) : (
            <RxChevronDown className="text-purple" />
          )}
        </div>

        {isActive && (
          <div className="absolute z-10 bg-white divide-y rounded-md mt-1 w-full shadow-md max-h-60 overflow-y-auto px-4 border border-borders">
            {options.map((option) => {
              const OptionIcon = iconMap[option.value];

              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`py-3 hover:text-purple cursor-pointer flex items-center space-x-3 ${
                    value === option.value ? "text-purple font-semibold" : ""
                  }`}
                >
                  {OptionIcon && <OptionIcon className="w-5 h-5 text-grey" />}
                  <span>{option.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
