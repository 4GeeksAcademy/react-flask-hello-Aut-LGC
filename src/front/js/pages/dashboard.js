import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("jwt-token");
    // Navigate to the login page
    navigate("/");
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("jwt-token") !== null;

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your home page after login.</p>
      {/* Logout button */}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};