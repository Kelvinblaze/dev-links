import DevicePreviewImage from "../../assets/images/device-preview.png";

const DevicePreview = () => {
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
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
              <div className="w-full h-[44px] bg-[#EEEEEE] rounded-lg animate-pulse" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DevicePreview;
