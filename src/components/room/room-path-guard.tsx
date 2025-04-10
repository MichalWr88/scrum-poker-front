"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  rooms: {
    _id: string;
    name: string;
  }[];
  children: React.ReactNode;
};

const RoomPathGuard = ({ children, rooms }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const roomId = pathname.split("/").pop();
  const roomExists = rooms.some((room) => room.name === roomId);
  console.log("Room ID:", roomId);
  console.log("Room Exists:", rooms);
  if (!roomExists) {

    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-red-500 uppercase">Room not found</h1>
        <p className="text-center text-gray-300 text-xl leading-relaxed tracking-wider">
          The room you are looking for does not exist. Please check the list of
          acceptable rooms in your profile, accessible via the navbar.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go to Home Page
        </button>
      </div>
    );
  }
  return <>{children}</>;
};

export default RoomPathGuard;
