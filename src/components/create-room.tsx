"use client";

import { useState } from "react";

export function CreateRoom() {
  const [username, setUsername] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        {/* <Users className="w-6 h-6 text-indigo-600" /> */}
        <h2 className="text-xl font-semibold">Create New Room</h2>
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="create-username"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            type="text"
            id="create-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}
