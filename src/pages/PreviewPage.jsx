import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// UI Components
import Button from "../components/ui/Button";
import DevicePreviewScreen from "../components/dashboard/DevicePreviewScreen";

import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
const PreviewPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { user } = useSelector((state) => state.global);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/preview/${user._id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("The link has been copied to your clipboard!", {
        icon: "🔗",
      });
    });
  };
  return (
    <div className="min-h-screen h-max bg-light-grey flex flex-col">
      <section className="bg-purple rounded-b-xl">
        <div className="px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10 min-h-[40vh]">
          <div className="bg-white rounded-lg flex justify-between p-6 md:p-4">
            {/* Back to Editor Button */}
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back to Editor
            </Button>

            {/* Share Link Button */}
            <Button variant="primary" onClick={handleCopyLink}>
              Share Link
            </Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="absolute top-20 left-0 w-full h-full flex items-center justify-center">
        <div className="h-max min-w-[350px] bg-white rounded-xl w-max p-10 shadow-xl overflow-y-scroll">
          <DevicePreviewScreen user={user} links={user.links} />
        </div>
      </section>
    </div>
  );
};

export default PreviewPage;
