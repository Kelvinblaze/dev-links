import Input from "../../components/ui/Input";
import DropDown from "../ui/Dropdown";

import { MdOutlineDragHandle } from "react-icons/md";
import { PiLink } from "react-icons/pi";

import GitHubIcon from "../icons/GithubIcon";
import FrontendMentorIcon from "../icons/FrontendMentorIcon";
import TwitterIcon from "../icons/TwitterIcon";
import LinkedInIcon from "../icons/LinkedInIcon";
import YouTubeIcon from "../icons/YoutubeIcon";
import FacebookIcon from "../icons/FacebookIcon";
import TwitchIcon from "../icons/TwitchIcon";
import DevtoIcon from "../icons/DevtoIcon";
import CodewarsIcon from "../icons/CodeWarsIcon";
import CodepenIcon from "../icons/CodePenIcon";
import FreeCodeCampIcon from "../icons/FreeCodeCampIcon";
import GitlabIcon from "../icons/GitLabIcon";
import HashnodeIcon from "../icons/HashNodeIcon";
import StackOverflowIcon from "../icons/StackOverflowIcon";

const LinkInputCard = ({ index, link, handleRemove, handleChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(index, name, value);
  };

  const menuList = [
    { label: "GitHub", value: "github", icon: GitHubIcon },
    {
      label: "Frontend Mentor",
      value: "frontendmentor",
      icon: FrontendMentorIcon,
    },
    { label: "Twitter", value: "twitter", icon: TwitterIcon },
    { label: "LinkedIn", value: "linkedin", icon: LinkedInIcon },
    { label: "YouTube", value: "youtube", icon: YouTubeIcon },
    { label: "Facebook", value: "facebook", icon: FacebookIcon },
    { label: "Twitch", value: "twitch", icon: TwitchIcon },
    { label: "Dev.to", value: "devto", icon: DevtoIcon },
    { label: "Codewars", value: "codewars", icon: CodewarsIcon },
    { label: "Codepen", value: "codepen", icon: CodepenIcon },
    { label: "freeCodeCamp", value: "freecodecamp", icon: FreeCodeCampIcon },
    { label: "GitLab", value: "gitlab", icon: GitlabIcon },
    { label: "Hashnode", value: "hashnode", icon: HashnodeIcon },
    {
      label: "Stack Overflow",
      value: "stack_overflow",
      icon: StackOverflowIcon,
    },
  ];

  const dropDownIcon = (platform) => {
    switch (platform) {
      case "github":
        return GitHubIcon;
      case "frontendmentor":
        return FrontendMentorIcon;
      case "twitter":
        return TwitterIcon;
      case "linkedin":
        return LinkedInIcon;
      case "youtube":
        return YouTubeIcon;
      case "facebook":
        return FacebookIcon;
      case "twitch":
        return TwitchIcon;
      case "devto":
        return DevtoIcon;
      case "codewars":
        return CodewarsIcon;
      case "codepen":
        return CodepenIcon;
      case "freecodecamp":
        return FreeCodeCampIcon;
      case "gitlab":
        return GitlabIcon;
      case "hashnode":
        return HashnodeIcon;
      case "stack_overflow":
        return StackOverflowIcon;
      default:
        return null;
    }
  };

  return (
    <div className="bg-light-grey lg:p-8 p-5 rounded-lg space-y-5">
      <div className="flex justify-between items-center text-grey">
        <div className="flex items-center space-x-2">
          <MdOutlineDragHandle />
          <span className="font-bold">Link #{index + 1}</span>
        </div>
        <button onClick={() => handleRemove(index)}>Remove</button>
      </div>

      <DropDown
        label="Platform"
        placeholder="Select platform"
        name="platform"
        value={link.platform}
        onChange={handleInputChange}
        options={menuList}
        Icon={dropDownIcon(link.platform)}
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
      />
    </div>
  );
};

export default LinkInputCard;
