"use client";

import { redirect } from "next/navigation";

const RoomNotFoundSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 max-w-2xl">
      <h1 className="text-4xl font-bold text-red-500 uppercase">
        Room not found
      </h1>
      <p className="text-center text-gray-300 text-xl leading-relaxed tracking-wider">
        The room you are looking for does not exist. Please check the list of
        acceptable rooms in your profile, accessible via the navbar.
      </p>
      <button
        onClick={() => redirect("/")}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default RoomNotFoundSection;
