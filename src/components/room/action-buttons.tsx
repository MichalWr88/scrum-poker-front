"use client";

import { socketService } from "@/src/services/socket/socket-service";
import { useState } from "react";

const ActionButtons = () => {
  const [revealed, setRevealed] = useState(false);
  const clearMyVote = () => {
    socketService.clearMyVote();
  };
  const clearAllVotes = () => {
    socketService.clearAllVotes();
  };
  const toggleVotes = () => {
    setRevealed(!revealed);
    socketService.toggleVotes(revealed);
  };
  return (
    <div className="space-x-3">
      <button
        onClick={clearMyVote}
        className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
      >
        Clear My Vote
      </button>
      <button
        onClick={clearAllVotes}
        className="bg-blue-900 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        Clear All Votes
      </button>
      <button
        onClick={toggleVotes}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
      >
        {revealed ? "Hide Votes" : "Reveal Votes"}
      </button>
    </div>
  );
};

export default ActionButtons;
