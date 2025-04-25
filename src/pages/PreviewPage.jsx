import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

// UI Components
import Button from "../components/ui/Button";
import DevicePreviewScreen from "../components/dashboard/DevicePreviewScreen";

import axiosInstance from "../plugins/axiosInstance";
import { toast } from "react-hot-toast";
import { getToken } from "../utils/token";
const PreviewPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { username } = useParams(); // Get the username from the URL

  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/${username.toLowerCase()}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("The link has been copied to your clipboard!", {
        icon: "🔗",
      });
    });
  };

  useEffect(() => {
    // Check if the user is logged in
    const token = getToken();
    setShowMenu(!!token);

    // Fetch user and links using the id from the URL
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`user/${username}`);
        const { success, data } = await response.data;

        if (success) {
          setUser(data);
          setLinks(data.links);
        }
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <div className="min-h-screen h-max bg-light-grey flex flex-col">
      <section className="bg-purple rounded-b-xl">
        <div className="px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-10 min-h-[40vh]">
          {showMenu && (
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
          )}
        </div>
      </section>

      {/* Main content */}
      <section
        className={`absolute  left-0 w-full h-full flex items-center justify-center ${
          showMenu ? "top-20" : "top-0"
        }`}
      >
        <div className="h-max min-w-[350px] bg-white rounded-xl w-max p-10 shadow-xl overflow-y-scroll">
          <DevicePreviewScreen user={user} links={links} />
        </div>
      </section>
    </div>
  );
};

export default PreviewPage;
