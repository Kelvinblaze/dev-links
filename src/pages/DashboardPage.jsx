import { useState } from "react";

import DevicePreview from "../components/dashboard/DevicePreview";
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
    <div className="grid grid-cols-12 gap-5">
      <section className="lg:block hidden col-span-5 bg-white rounded-lg  md:p-10 p-5 grid place-content-center">
        <DevicePreview>
          <section className="w-full space-y-10">
            {/* Profile Section */}
            <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
              <div className="size-[96px] bg-[#EEEEEE] rounded-full animate-pulse" />

              <div className="space-y-2 items-center flex flex-col">
                <div className="w-[160px] h-[16px] bg-[#EEEEEE] rounded-full animate-pulse" />
                <div className="w-[72px] h-[8px] bg-[#EEEEEE] rounded-full animate-pulse" />
              </div>
            </div>

            {/* Link Section */}
            <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
            </div>
          </section>
        </DevicePreview>
      </section>

      <section className="lg:col-span-7 col-span-12  bg-white rounded-lg divide-y flex flex-col justify-between">
        <div className="space-y-5 md:p-10 p-5 flex-1 overflow-y-auto min-h-[600px] max-h-[600px]">
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

        <div className="md:p-10 p-5 flex justify-end bg-white">
          <Button variant="primary" disabled={true} className="w-full md:w-max">
            Save
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
