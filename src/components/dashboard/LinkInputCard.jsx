import { forwardRef, useImperativeHandle, useState } from "react";

import Input from "../../components/ui/Input";
import DropDown from "../ui/Dropdown";

import { MdOutlineDragHandle } from "react-icons/md";
import { PiLink } from "react-icons/pi";
import iconMap from "../../utils/iconMap";

const LinkInputCard = forwardRef(
  ({ index, link, handleRemove, handleChange }, ref) => {
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
      let message = "";
      let isValid = true;

      if (name === "url") {
        if (!value.trim()) {
          message = "Can't be empty.";
          isValid = false;
        } else {
          const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/\S*)?$/;
          if (!urlRegex.test(value)) {
            message = "Please check the URL";
            isValid = false;
          }
        }
      }

      setErrors((prev) => ({ ...prev, [name]: message }));
      return isValid;
    };

    const validate = () => {
      return validateField("url", link.url);
    };

    useImperativeHandle(ref, () => ({
      validate,
    }));

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      handleChange(index, name, value);
      validateField(name, value);
    };

    const handleDropdownChange = (selectedOption) => {
      const { label, value, color, icon } = selectedOption.target;
      handleChange(index, "platform", value, { label, color, icon });
    };

    const menuList = [
      { label: "GitHub", value: "github", color: "#1A1A1A" },
      {
        label: "Frontend Mentor",
        value: "frontendmentor",
        color: "#FFFFFF",
      },
      { label: "Twitter", value: "twitter", color: "#43B7E9" },
      { label: "LinkedIn", value: "linkedin", color: "#2D68FF" },
      { label: "YouTube", value: "youtube", color: "#EE3939" },
      { label: "Facebook", value: "facebook", color: "#2442AC" },
      { label: "Twitch", value: "twitch", color: "#EE3FC8" },
      { label: "Dev.to", value: "devto", color: "#333333" },
      { label: "Codewars", value: "codewars", color: "#8A1A50" },
      { label: "Codepen", value: "codepen", color: "#000000" },
      { label: "freeCodeCamp", value: "freecodecamp", color: "#302267" },
      { label: "GitLab", value: "gitlab", color: "#EB4925" },
      { label: "Hashnode", value: "hashnode", color: "#0330D1" },
      {
        label: "Stack Overflow",
        value: "stack_overflow",
        color: "#EC7100",
      },
    ];

    return (
      <div className="bg-light-grey lg:p-8 p-5 rounded-lg space-y-5">
        <div className="flex justify-between items-center text-grey">
          <div className="flex items-center space-x-2">
            <MdOutlineDragHandle />
            <span className="font-bold">Link #{index + 1}</span>
          </div>
          <button type="button" onClick={() => handleRemove(index)}>
            Remove
          </button>
        </div>

        <DropDown
          label="Platform"
          placeholder="Select platform"
          name="platform"
          value={link.platform}
          onChange={handleDropdownChange}
          options={menuList}
          Icon={iconMap[link.platform]}
        />
        <Input
          label="Link"
          name="url"
          value={link.url}
          onChange={handleInputChange}
          Icon={PiLink}
          placeholder={`e.g. https://www.${
            link.platform || "yourplatform"
          }.com/username`}
          errorMessage={errors.url}
        />
      </div>
    );
  }
);

export default LinkInputCard;
