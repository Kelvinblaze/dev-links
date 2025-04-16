import DevicePreviewImage from "../../assets/images/device-preview.png";

import { useSelector } from "react-redux";

// components
import SkeletonDeviceLinks from "../skeletons/SkeletonDeviceLinks";
import SkeletonText from "../skeletons/SkeletonText";
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
      <div className="absolute top-[60px] left-[25px] w-[250px] h-[450px] overflow-y-scroll bg-white overflow-hidden rounded-[20px] p-5">
        <div className="w-full">
          <section className="w-full space-y-10">
            {/* Profile Section */}
            <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
              {user.photo === null ? (
                <div className="size-[96px] bg-[#EEEEEE] rounded-full animate-pulse" />
              ) : (
                <div className="size-[96px]"></div>
              )}

              <div className="space-y-2 items-center flex flex-col">
                <SkeletonText
                  text={user.firstname + " " + user.lastname}
                  className="font-semibold text-dark-grey"
                />
                <SkeletonText
                  text={user.email}
                  width={72}
                  height={8}
                  className="grey text-xs"
                />
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
