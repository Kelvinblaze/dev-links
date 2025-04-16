import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/globalSlice";
// Components
import Header from "../components/layout/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ImageUploader from "../components/dashboard/ImageUploader";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);

  const handleImageUpload = (file) => {
    console.log(file);
  };

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = "";
    let isValid = true;

    if (name === "firstname" || name === "lastname") {
      if (!value.trim()) {
        message = "Can't be empty.";
        isValid = false;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        message = "Can't be empty.";
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          message = "Please enter a valid email address.";
          isValid = false;
        }
      }
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ ...user, [name]: value }));
    validateField(name, value);
  };

  return (
    <form className="space-y-10">
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
          <Input
            placeholder="Ben"
            name="firstname"
            value={user.firstname}
            onChange={handleInputChange}
            errorMessage={errors.firstname}
          />
        </div>

        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Last name*</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input
            placeholder="Wright"
            name="lastname"
            value={user.lastname}
            onChange={handleInputChange}
            errorMessage={errors.lastname}
          />
        </div>

        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Email</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input
            name="email"
            placeholder="ben@example.com"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            errorMessage={errors.email}
          />
        </div>
      </section>

      {/* Submission Button */}
      <div className="sticky bottom-0 bg-white p-6 border-t flex justify-end w-full z-10">
        <Button type="submit" variant="primary" className="w-full md:w-auto">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfilePage;
