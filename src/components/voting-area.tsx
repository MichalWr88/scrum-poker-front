'use client';

import { usePokerStore } from '@/store/poker-store';

const VALID_VOTES = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '?'];

export function VotingArea() {
  const { submitVote } = usePokerStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>
      
      <div className="grid grid-cols-5 gap-4">
        {VALID_VOTES.map((vote) => (
          <button
            key={vote}
            onClick={() => submitVote(vote)}
            className="aspect-square bg-indigo-50 rounded-lg text-2xl font-bold text-indigo-900 hover:bg-indigo-100 transition-colors"
          >
            {vote}
          </button>
        ))}
      </div>
    </div>
  );
}