import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Header from "../layout/Header";
import Input from "../ui/Input";
import Button from "../ui/Button";

// Icons
import { PiEnvelopeSimpleFill, PiLockKeyFill } from "react-icons/pi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

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
    errors.password.length >= 8;

  const handleLogin = (e) => {
    e.preventDefault();

    validateField("email", email);
    validateField("password", password);

    if (hasErrors) return;

    console.log("Logging in...");
    // your login logic here
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

        <Button
          type="submit"
          variant="primary"
          full={true}
          disabled={hasErrors}
        >
          Login
        </Button>
      </div>

      <p className="text-center text-bodyM text-grey">
        Don’t have an account?{" "}
        <Link to="/register" className="text-purple">
          Create account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
