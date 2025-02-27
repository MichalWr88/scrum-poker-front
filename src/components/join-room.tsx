'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { usePokerStore } from '@/store/poker-store';

export function JoinRoom() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const { setUsername: setStoreUsername, joinRoom } = usePokerStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim() || !username.trim()) return;

    setStoreUsername(username);
    joinRoom(roomId, username);
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <LogIn className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Join Existing Room</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="room-id" className="block text-sm font-medium text-gray-700">
            Room ID
          </label>
          <input
            type="text"
            id="room-id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter room ID"
            required
          />
        </div>

        <div>
          <label htmlFor="join-username" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="join-username"
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
          Join Room
        </button>
      </form>
    </div>
  );
}