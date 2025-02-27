'use client';

import { Users } from 'lucide-react';
import { usePokerStore } from '@/store/poker-store';

export function ParticipantList() {
  const { participants, revealed } = usePokerStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Participants</h2>
      </div>

      <ul className="space-y-3">
        {participants.map((participant, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span>{participant.username}</span>
            <span className="font-mono font-bold">
              {participant.vote 
                ? (revealed ? participant.vote : '✓')
                : '...'
              }
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}