import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../../plugins/axiosInstance";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setUser, setLinks, setToken } from "../../store/globalSlice";

// Components
import Header from "../layout/Header";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Icons
import { PiEnvelopeSimpleFill, PiLockKeyFill } from "react-icons/pi";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
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
      // Password Length Check
      if (name === "password") {
        if (value.length < 8) {
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validateField("password", value);
  };

  const hasErrors =
    !email.trim() ||
    !password.trim() ||
    errors.email.length > 0 ||
    errors.password.length > 0;

  const LoginUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("auth/login", {
        email,
        password,
      });

      const { success, data, message } = await response.data;

      if (success) {
        toast.success(message);

        // Set token
        localStorage.setItem("dv-token", data.token);

        // Set redux store for token , user and links
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        dispatch(setLinks(data.user.links));

        // Redirect to dashboard or home page
        navigate("/dashboard");
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

  const handleLogin = async (e) => {
    e.preventDefault();

    validateField("email", email);
    validateField("password", password);

    if (hasErrors) return;

    await LoginUser(email, password);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-8">
      <Header
        title="Login"
        subtitle="Add your details below to get back into the app"
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

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          Icon={PiLockKeyFill}
          value={password}
          onChange={handlePasswordChange}
          errorMessage={errors.password}
        />

        <div className="flex items-center justify-end">
          <Link to="/forgot-password" className="text-sm text-purple">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          full={true}
          disabled={hasErrors}
          loading={loading}
        >
          Login
        </Button>
      </div>

      <p className="text-center text-md text-grey">
        Don’t have an account?{" "}
        <Link to="/register" className="text-purple">
          Create account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
