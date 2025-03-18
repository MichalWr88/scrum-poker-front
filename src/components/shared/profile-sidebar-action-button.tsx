"use client";
import { User } from "next-auth";
import Image from "next/image";
import { ProfileSidebar } from "./profile-sidebar";
import { useState } from "react";

type Props = {
  user: User;
};

const ProfileSidebarActionButton = ({ user }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center mr-2 text-lg font-bold text-white" onClick={toggleSidebar}>
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
      <ProfileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />
    </div>
  );
};

export default ProfileSidebarActionButton;
