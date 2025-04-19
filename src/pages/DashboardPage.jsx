import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { setLinks } from "../store/globalSlice";

import Onboarding from "../components/dashboard/Onboarding";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import LinkInputCard from "../components/dashboard/LinkInputCard";

import axiosInstance from "../plugins/axiosInstance";
import { PiPlus } from "react-icons/pi";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { links } = useSelector((state) => state.global);

  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Add a new link
  const handleNewLink = () => {
    const updatedLinks = [
      ...(links || []),
      { platform: "", url: "", color: "", label: "" },
    ];
    dispatch(setLinks(updatedLinks));
  };

  // Remove a link
  const handleRemoveLink = (index) => {
    const updatedLinks = [...(links || [])].filter((_, i) => i !== index);
    dispatch(setLinks(updatedLinks));
  };

  // Handle changes to a link
  const handleLinkChange = (index, field, value, options = {}) => {
    if (
      field === "platform" &&
      links.some((link, i) => link.platform === value && i !== index)
    ) {
      toast.error("You have already added this platform.");
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

  // Save links to the API
  const saveLinks = async (links) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put("user/links", { links });
      const { success, data } = response.data;

      if (success) {
        dispatch(setLinks(data.links));
        toast.success("Links saved successfully!");
      } else {
        toast.error("Failed to save links.");
      }
    } catch (error) {
      console.error("Error saving links:", error);
      toast.error("Failed to save links.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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

    await saveLinks(links);
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);

    dispatch(setLinks(reorderedLinks));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 relative p-6">
      {/* Header Section */}
      <Header
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      {/* Add New Link Button */}
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

      {/* Links Section */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-5"
            >
              {links.length > 0 ? (
                links.map((link, idx) => (
                  <Draggable key={idx} draggableId={`link-${idx}`} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <LinkInputCard
                          index={idx}
                          link={link}
                          ref={(el) => (inputRefs.current[idx] = el)}
                          handleRemove={handleRemoveLink}
                          handleChange={handleLinkChange}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <Onboarding />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Save Button */}
      <div className="sticky bottom-0 left-0 bg-white p-6 border-t flex justify-end w-full z-10">
        <Button
          type="submit"
          variant="primary"
          disabled={links.length <= 0}
          className="w-full md:w-auto"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default DashboardPage;
