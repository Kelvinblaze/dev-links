import SkeletonDeviceLinks from "../skeletons/SkeletonDeviceLinks";
import iconMap from "../../utils/iconMap";

const LinkPreview = ({ link }) => {
  const Icon = iconMap[link.platform];
  return (
    <div className="w-full">
      {link.platform === "" ? (
        <SkeletonDeviceLinks />
      ) : (
        <a href={link.url} target="_blank">
          <div
            className={`w-full h-[44px] rounded-lg px-5 grid place-content-center justify-start hover:shadow-sm ${
              link.platform === "frontendmentor"
                ? "text-dark-grey border border-borders"
                : "text-white"
            }`}
            style={{ backgroundColor: link.color }}
          >
            <div className="flex items-center space-x-2 text-sm">
              {Icon && <Icon className="text-white" />}
              <span> {link.label}</span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default LinkPreview;
