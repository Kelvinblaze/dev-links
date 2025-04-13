import React from "react";

// Components
import Header from "../components/layout/Header";
import Input from "../components/ui/Input";
import ImageUploader from "../components/dashboard/ImageUploader";

const ProfilePage = () => {
  const handleImageUpload = (file) => {
    console.log(file);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <Header
        title="Profile Details"
        subtitle="Add your details to create a personal touch to your profile."
      />

      {/* Profile Image Upload */}
      <section className="bg-light-grey w-full rounded-lg p-5 grid grid-cols-12 gap-5 items-center">
        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Profile Picture</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <ImageUploader
            label="Image must be below 1024x1024px. Use PNG or JPG format."
            onChange={handleImageUpload}
          />
        </div>
      </section>

      {/* Personal Info  */}
      <section className="bg-light-grey w-full rounded-lg p-5 grid grid-cols-12 gap-5 items-center">
        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">First name*</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input placeholder="Ben" />
        </div>

        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Last name*</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input placeholder="Wright" />
        </div>

        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Email</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input placeholder="ben@example.com" type="email" />
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
