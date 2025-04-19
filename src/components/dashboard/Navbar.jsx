import { Link } from "react-router-dom";
import Logo from "../layout/Logo";
import Button from "../ui/Button";
import TabMenu from "../ui/TabMenu";

// Icons
import { PiLinkBold } from "react-icons/pi";
import { PiUserCircleBold } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";

const Navbar = () => {
  const Tabs = [
    {
      title: "Links",
      url: "/dashboard",
      Icon: PiLinkBold,
    },
    {
      title: "Profile Details",
      url: "/dashboard/profile",
      Icon: PiUserCircleBold,
    },
  ];

  return (
    <nav className="flex items-center justify-between bg-white p-5 rounded-lg">
      <div className="md:hidden block">
        <Logo variant="icon" />
      </div>
      <div className="hidden md:block">
        <Logo />
      </div>

      <TabMenu tabs={Tabs} />

      <Link to="/dashboard/preview">
        <Button variant="secondary">
          <div className="flex items-center space-x-2">
            <PiEyeBold className="block md:hidden" />
            <span className="md:block hidden">Preview</span>
          </div>
        </Button>
      </Link>
    </nav>
  );
};

export default Navbar;
