import DevicePreviewImage from "../../assets/images/device-preview.png";

import { useSelector } from "react-redux";

// components
import SkeletonDeviceLinks from "../skeletons/SkeletonDeviceLinks";
import LinkPreview from "../dashboard/LinkPreview";

const DevicePreview = () => {
  const { links, user } = useSelector((state) => state.global);
  return (
    <div
      className="relative h-[600px] w-[300px] bg-no-repeat bg-center bg-contain mx-auto"
      style={{
        backgroundImage: `url(${DevicePreviewImage})`,
      }}
    >
      {/* screen area */}
      <div className="absolute top-[60px] left-[25px] w-[250px] h-[450px] bg-white overflow-hidden rounded-[20px] p-5">
        <div className="w-full">
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
              {links.length > 0
                ? links.map((link, i) => <LinkPreview key={i} link={link} />)
                : Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonDeviceLinks key={i} />
                  ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DevicePreview;
