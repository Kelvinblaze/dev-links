import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../../plugins/axiosInstance";
import { toast } from "react-hot-toast";

// Components
import Header from "../layout/Header";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Icons
import { PiEnvelopeSimpleFill } from "react-icons/pi";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let message = "";

    if (!value.trim()) {
      message = "Can't be empty.";
    } else {
      // Email Checking
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          message = "Please check again";
        }
      }
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField("email", value);
  };

  const hasErrors = !email.trim() || errors.email.length > 0;

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("auth/forgot-password", {
        email,
      });

      const { success, message } = await response.data;

      if (success) {
        toast.success(message);

        // Redirect to dashboard or home page
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        `Login error: ${error?.response?.data?.message ?? "An error occurred"}`
      );
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    validateField("email", email);

    if (hasErrors) return;

    await forgotPassword(email);
  };

  return (
    <form onSubmit={handleForgotPassword} className="space-y-8">
      <Header
        title="Forgot Password"
        subtitle="Enter your email address to reset your password."
      />

      <div className="space-y-5">
        <Input
          label="Email address"
          type="email"
          placeholder="e.g. alex@email.com"
          Icon={PiEnvelopeSimpleFill}
          value={email}
          onChange={handleEmailChange}
          errorMessage={errors.email}
        />

        <div className="flex items-center justify-end">
          <Link to="/login" className="text-sm text-purple">
            Remember password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          full={true}
          disabled={hasErrors}
          loading={loading}
        >
          Forgot Password
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
