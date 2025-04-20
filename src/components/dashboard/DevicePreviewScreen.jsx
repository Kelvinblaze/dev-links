// components
import SkeletonDeviceLinks from "../skeletons/SkeletonDeviceLinks";
import SkeletonText from "../skeletons/SkeletonText";
import LinkPreview from "../dashboard/LinkPreview";

const DevicePreviewScreen = ({ user, links }) => {
  return (
    <section className="w-full space-y-10">
      {/* Profile Section */}
      <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
        {!user?.photo ? (
          <div className="size-[96px] bg-[#EEEEEE] rounded-full animate-pulse" />
        ) : (
          <div className="size-[96px] rounded-full ">
            <img
              src={user.photo}
              alt={user.firstName + " " + user.lastName}
              className="object-cover size-full rounded-full "
            />
          </div>
        )}

        <div className="space-y-2 items-center flex flex-col">
          <SkeletonText
            text={(user?.firstName || "") + " " + (user?.lastName || "")}
            className="font-semibold text-dark-grey"
          />
          <SkeletonText
            text={user?.email}
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
          : Array.from({ length: 4 }).map((_, i) => (
              <SkeletonDeviceLinks key={i} />
            ))}
      </div>
    </section>
  );
};

export default DevicePreviewScreen;
