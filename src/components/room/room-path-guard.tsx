"use client";

import { usePathname } from "next/navigation";
import React from "react";
import RoomNotFoundSection from "./errors/not-found-section";

type Props = {
  rooms: {
    _id: string;
    name: string;
  }[];
  children: React.ReactNode;
};

const RoomPathGuard = ({ children, rooms }: Props) => {
  const pathname = usePathname();
  const roomId = pathname.split("/").pop();
  const roomExists = rooms.some((room) => room.name === roomId);
  console.log("Room ID:", roomId);
  console.log("Room Exists:", rooms);
  if (!roomExists) {
    return <RoomNotFoundSection />;
  }
  return <>{children}</>;
};

export default RoomPathGuard;
