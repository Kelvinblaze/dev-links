import { useSelector, useDispatch } from "react-redux";
import { setLinks } from "../store/globalSlice";

import Onboarding from "../components/dashboard/Onboarding";

import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import LinkInputCard from "../components/dashboard/LinkInputCard";

import { PiPlus } from "react-icons/pi";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { links } = useSelector((state) => state.global);

  const handleNewLink = () => {
    const updatedLinks = [...(links || []), { platform: "", url: "" }];
    dispatch(setLinks(updatedLinks));
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...(links || [])].filter((_, i) => i !== index);
    dispatch(setLinks(updatedLinks));
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = (links || []).map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    dispatch(setLinks(updatedLinks));
  };

  return (
    <div className="space-y-10">
      <Header
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      <Button full={true} variant="secondary" onClick={handleNewLink}>
        <div className="flex items-center space-x-2 justify-center">
          <PiPlus />
          <span>Add new link</span>
        </div>
      </Button>

      {links.length > 0 ? (
        links.map((link, idx) => (
          <LinkInputCard
            key={idx}
            index={idx}
            link={link}
            handleRemove={handleRemoveLink}
            handleChange={handleLinkChange}
          />
        ))
      ) : (
        <Onboarding />
      )}
    </div>
  );
};

export default DashboardPage;
