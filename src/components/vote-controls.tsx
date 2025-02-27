'use client';

import { Eye, RotateCcw } from 'lucide-react';
import { usePokerStore } from '@/store/poker-store';

export function VoteControls() {
  const { revealVotes, resetVotes, revealed } = usePokerStore();

  return (
    <div className="flex gap-4">
      <button
        onClick={revealVotes}
        disabled={revealed}
        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Eye className="w-5 h-5" />
        Reveal Votes
      </button>

      <button
        onClick={resetVotes}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white rounded-md py-2 px-4 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <RotateCcw className="w-5 h-5" />
        Reset Votes
      </button>
    </div>
  );
}