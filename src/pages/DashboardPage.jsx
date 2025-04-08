import { useState } from "react";

import Onboarding from "../components/dashboard/Onboarding";

import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import LinkInputCard from "../components/dashboard/LinkInputCard";

const DashboardPage = () => {
  const [links, setLinks] = useState([]);

  const handleNewLink = () => {
    setLinks((prevState) => [
      ...prevState,
      {
        platform: "",
        url: "",
      },
    ]);
  };

  const handleRemoveLink = (index) => {
    const updateLinks = links.filter((_, i) => i !== index);
    setLinks(updateLinks);
  };

  const handleLinkChange = (index, field, value) => {
    setLinks((prevState) =>
      prevState.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    );
  };

  return (
    <div className="space-y-10">
      <Header
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      <Button full={true} variant="secondary" onClick={handleNewLink}>
        <div>
          <span className="">+ Add new link</span>
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
