import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Header from "../layout/Header";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Icons
import { PiEnvelopeSimpleFill } from "react-icons/pi";
import { PiLockKeyFill } from "react-icons/pi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

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

      // Password Confirmation Check
      if (name === "confirm_password") {
        if (value !== password) {
          message = "Password do not match";
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

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateField("confirm_password", value);
  };

  const hasErrors =
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    errors.email.length > 0 ||
    errors.password.length > 0 ||
    errors.confirm_password.length > 0;

  const handleSignUp = (e) => {
    e.preventDefault();

    validateField("email", email);
    validateField("password", password);
    validateField("confirm_password", confirmPassword);

    if (hasErrors) return;

    console.log("Logging in...");
    // your login logic here
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-8">
      <Header
        title="Create account"
        subtitle="Let’s get you started sharing your links!"
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
          label="Create password"
          type="password"
          placeholder="At least .8 characters"
          Icon={PiLockKeyFill}
          value={password}
          onChange={handlePasswordChange}
          errorMessage={errors.password}
        />

        <Input
          label=" Confirm password"
          type="password"
          placeholder="At least .8 characters"
          Icon={PiLockKeyFill}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          errorMessage={errors.confirm_password}
        />

        <p className="text-sm text-grey">
          Password must contain at least 8 characters
        </p>

        <Button
          type="submit"
          variant="primary"
          full={true}
          disabled={hasErrors}
        >
          Create new account
        </Button>
      </div>

      <p className="text-center text-md text-grey">
        Already have an account?{" "}
        <Link to="/login" className="text-purple">
          Login
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
