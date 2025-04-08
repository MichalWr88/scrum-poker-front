"use client";
import { User } from "next-auth";
import Image from "next/image";
import { updateRole } from "./profile-server-actions";
import RoomList from "./sidebar/rooms-list";

export function ProfileSidebar({
  isOpen,
  onClose,
  user,
  rooms,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  rooms?: {
    _id: string;
    name: string;
  }[];
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 opacity-85 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
              {user?.image ? (
                <Image
                  width={60}
                  height={60}
                  src={user?.image}
                  alt="User Avatar"
                  className="w-full h-full rounded-full"
                />
              ) : (
                user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "?"
              )}
            </div>
            <div>
              <p className="font-medium text-blue-900">{user?.name}</p>
              <p className="text-sm text-sky-600">{user?.email}</p>
              <p className="text-sm text-sky-800 uppercase bold">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <form action={updateRole}>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Change Role
              </label>
              <select
                name="role"
                defaultValue={user.role}
                className="text-blue-900 block w-full py-2 px-3 border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              >
                <option value="developer">developer</option>
                <option value="tester">tester</option>
              </select>
              <button
                type="submit"
                className="mt-4 w-full py-2 px-4 bg-sky-600 text-white rounded-md hover:bg-sky-700"
              >
                Update Role
              </button>
            </form>
            <button
              type="button"
              className="w-full text-left py-2 px-4 rounded-md hover:bg-sky-50 text-blue-900 font-medium"
            >
              Profile Settings
            </button>
            <button className="w-full text-left py-2 px-4 rounded-md hover:bg-sky-50 text-blue-900 font-medium">
              History of votes
            </button>
            <hr className="my-4 border-sky-200" />
          </div>
          <RoomList rooms={rooms} />
        </div>
      </div>
    </>
  );
}
