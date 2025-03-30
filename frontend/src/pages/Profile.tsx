import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {user && (
          <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center">
            <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
