"use client";
import { User } from "next-auth";
import Image from "next/image";
import { ProfileSidebar } from "./profile-sidebar";
import { useState } from "react";

type Props = {
  user: User;
  rooms?: {
    _id: string;
    name: string;
  }[];
};

const ProfileSidebarActionButton = ({ user, rooms }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div
        title="Profile"
        className="w-10 h-10 rounded-full  flex items-center justify-center mr-2 text-lg font-bold cursor-pointer hover:transform hover:scale-110 transition-transform"
        onClick={toggleSidebar}
      >
        {user?.image ? (
          <Image
            src={user?.image}
            alt="User Avatar"
            className="w-full h-full rounded-full"
            width={60}
            height={60}
          />
        ) : (
          user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "?"
        )}
      </div>
      <ProfileSidebar
        rooms={rooms}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        user={user}
      />
    </>
  );
};

export default ProfileSidebarActionButton;
