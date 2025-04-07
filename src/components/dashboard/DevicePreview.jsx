import DevicePreviewImage from "../../assets/images/device-preview.png";

const DevicePreview = ({ children }) => {
  return (
    <div
      className="relative h-[600px] w-[300px] bg-no-repeat bg-center bg-contain mx-auto"
      style={{
        backgroundImage: `url(${DevicePreviewImage})`,
      }}
    >
      {/* screen area */}
      <div className="absolute top-[60px] left-[25px] w-[250px] h-[450px] bg-white overflow-hidden rounded-[20px] p-5">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default DevicePreview;
