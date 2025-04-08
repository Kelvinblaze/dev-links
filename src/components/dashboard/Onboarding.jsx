import GetStartedImage from "../../assets/images/get-started.svg";

const Onboarding = () => {
  return (
    <div className="bg-light-grey p-5 md:p-10 rounded-lg space-y-5">
      <div className="mx-auto w-[250px] h-[160px]">
        <img
          src={GetStartedImage}
          alt="get-started"
          className="w-full h-auto object-contain"
        />
      </div>

      <h5 className="md:text-3xl text-2xl font-semibold text-center text-dark-grey">
        Let’s get you started
      </h5>
      <div className="md:w-4/6 mx-auto">
        <p className="text-grey text-center">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
