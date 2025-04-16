import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { setLinks } from "../store/globalSlice";

import Onboarding from "../components/dashboard/Onboarding";

import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import LinkInputCard from "../components/dashboard/LinkInputCard";

import { PiPlus } from "react-icons/pi";

import toast from "react-hot-toast";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { links } = useSelector((state) => state.global);

  const handleNewLink = () => {
    const updatedLinks = [
      ...(links || []),
      { platform: "", url: "", color: "", label: "" },
    ];
    dispatch(setLinks(updatedLinks));
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...(links || [])].filter((_, i) => i !== index);
    dispatch(setLinks(updatedLinks));
  };

  const handleLinkChange = (index, field, value, options = {}) => {
    // Check if platform already exist before pushing to array
    if (
      field === "platform" &&
      links.some((link, i) => link.platform === value && i !== index)
    ) {
      // Throw Error that platform already exists
      toast.error("you have already added this platform.");
    } else {
      const updatedLinks = (links || []).map((link, i) =>
        i === index
          ? {
              ...link,
              [field]: value,
              ...(options.label && { label: options.label }),
              ...(options.color && { color: options.color }),
            }
          : link
      );

      dispatch(setLinks(updatedLinks));
    }
  };

  const inputRefs = useRef([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAllValid = inputRefs.current
      .map((input) => input?.validate?.())
      .every((result) => result === true);

    if (!isAllValid) {
      toast.error("Please check all fields");
      return;
    }

    if (links.some((link) => link.platform === "")) {
      toast.error("Kindly ensure to select a platform for all links");
      return;
    }

    // Submit logic to API for proper saving...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 relative p-6">
      <Header
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      <Button
        full={true}
        variant="secondary"
        type="button"
        onClick={handleNewLink}
      >
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
            ref={(el) => (inputRefs.current[idx] = el)}
            handleRemove={handleRemoveLink}
            handleChange={handleLinkChange}
          />
        ))
      ) : (
        <Onboarding />
      )}

      <div className="sticky bottom-0 left-0 bg-white p-6 border-t flex justify-end w-full z-10">
        <Button
          type="submit"
          variant="primary"
          disabled={links.length <= 0}
          className="w-full md:w-auto"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default DashboardPage;
