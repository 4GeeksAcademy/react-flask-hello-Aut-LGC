import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Email and password must be entered");
    } else if (password !== repeatPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.msg); // Throw the error message from the backend
        }

        // If signup is successful, redirect to login page
        navigate("/");
      } catch (error) {
        console.error("Error signing up:", error.message);

        // Check if the error message indicates that the email already exists
        if (error.message.includes("already exists")) {
          alert("This email is already registered. Please use a different email.");
          
          // Clear input fields after the user clicks "OK" on the alert
          setEmail("");
          setPassword("");
          setRepeatPassword("");
        } else {
          alert("Failed to sign up. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input
            type="password"
            className="form-control"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};