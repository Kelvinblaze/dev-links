import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/globalSlice";
// Components
import Header from "../components/layout/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ImageUploader from "../components/dashboard/ImageUploader";
import axiosInstance from "../plugins/axiosInstance";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const imageFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (file) => {
    if (file) {
      const image = await imageFileToBase64(file);
      dispatch(setUser({ ...user, photo: image }));
    } else {
      dispatch(setUser({ ...user, photo: file }));
    }
  };

  const validateField = (name, value) => {
    let message = "";
    let isValid = true;

    if (name === "firstName" || name === "lastName" || name === "username") {
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

  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);

      const response = await axiosInstance.put("user/update", {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        photo: userData.photo,
      });

      const { success, data, message } = response.data;

      if (success) {
        dispatch(setUser(data));
        toast.success(message);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(user);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 p-6">
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
            preview={user.photo}
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
            placeholder="Alex"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            errorMessage={errors.firstName}
          />
        </div>

        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Last name*</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input
            placeholder="Wright"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            errorMessage={errors.lastName}
          />
        </div>

        <div className="md:col-span-4 col-span-12">
          <p className="text-grey">Username*</p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <Input
            placeholder="alexwright"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            errorMessage={errors.username}
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
        <Button
          type="submit"
          variant="primary"
          className="w-full md:w-auto"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfilePage;
