"use client";
import Link from "next/link";

const RoomList = ({ rooms }: { rooms?: { _id: string; name: string }[] }) => {
  if (!rooms) return null;

  return (
    <div className="flex flex-col gap-2 text-blue-900 justify-center items-center">
      {rooms.map((room) => (
        <Link key={room.name} href={`/room/${room.name}`} className="p-2 rounded-md hover:bg-blue-100 w-full text-center">
          {room.name}
        </Link>
      ))}
    </div>
  );
};

export default RoomList;
