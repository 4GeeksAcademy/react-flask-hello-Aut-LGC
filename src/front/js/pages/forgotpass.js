import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailExists, setEmailExists] = useState(true);
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const generateOTP = () => {
    const newOTP = Math.floor(1000 + Math.random() * 9000);
    setOtp(newOTP);
    setIsOTPGenerated(true);
  };

  const handleOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/check-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const exists = data.exists;

        if (exists) {
          setEmailExists(true);
          generateOTP();
          // Store email in the store
          actions.setEmail(email);
        } else {
          setEmailExists(false);
        }
      } else {
        console.error("Server error:", response.statusText);
        setEmailExists(false);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/update-otp`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        navigate("/resetpass");
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Forgot Password</h1>
      <p>
        Please type in your email and press Generate OTP. You will get a
        one-time access code to reset your password. Please remember the code
        and enter it when required after pressing submit. After that, you can
        enter your new password and login again.
      </p>
      <form onSubmit={handleOTP}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate OTP
        </button>
      </form>
      {!emailExists && (
        <div className="mt-3 text-danger">
          Email does not exist. Please enter a valid email address.
        </div>
      )}
      {otp && (
        <div className="mt-3">
          <p>One-time access code:</p>
          <h2>{otp}</h2>
          <p>Please remember this code for password reset.</p>
        </div>
      )}
      {isOTPGenerated && (
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Go to reset password
          </button>
        </div>
      )}
    </div>
  );
};