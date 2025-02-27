"use client";

import { useState } from "react";
import { VotingArea } from "./voting-area";
import { ParticipantList } from "./participant-list";

// Sample data - in a real app, this would come from a database or API
const initialParticipants = [
  { id: 1, username: "Alice", vote: null },
  { id: 2, username: "Bob", vote: "3" },
  { id: 3, username: "Charlie", vote: "5" },
  { id: 4, username: "David", vote: null },
];

const mockJiraTask = {
  key: "SCRUM-123",
  summary: "Implement user authentication flow",
  description:
    "Create a secure authentication system with login, registration, and password reset functionality.",
  assignee: "Alice",
  storyPoints: null,
  priority: "High",
  status: "To Do",
};

export function ScrumPokerRoom() {
  const [participants, setParticipants] = useState(initialParticipants);
  const [revealed, setRevealed] = useState(false);
  const [currentVote, setCurrentVote] = useState<string | null>(null);

  // Function to handle when a user casts a vote
  const handleVote = (vote: string) => {
    setCurrentVote(vote);
    // Update current user's vote in participants list
    // In a real app, you would send this to a server
    setParticipants((prev) =>
      prev.map((p) => (p.username === "You" ? { ...p, vote } : p))
    );
  };

  // Toggle vote visibility
  const toggleVotes = () => {
    setRevealed(!revealed);
  };

  return (
    <div className="flex h-screen">
      {/* Left side (70%): Voting area and participants */}
      <div className="w-[70%] p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">
          Planning Poker: {mockJiraTask.key}
        </h1>

        {/* Voting controls and reveal button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Your Vote: {currentVote || "Not voted"}</h2>
          <button
            onClick={toggleVotes}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {revealed ? "Hide Votes" : "Reveal Votes"}
          </button>
        </div>

        {/* Voting area component */}
        <VotingArea onVote={handleVote} />

        {/* Participant list with votes */}
        <ParticipantList participants={participants} revealed={revealed} />
      </div>

      {/* Right side (30%): Jira task details */}
      <div className="w-[30%] bg-gray-50 p-6 border-l border-gray-200">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Task Details</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Key</p>
              <p className="font-medium">{mockJiraTask.key}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Summary</p>
              <p className="font-medium">{mockJiraTask.summary}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-sm">{mockJiraTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Assignee</p>
                <p className="font-medium">{mockJiraTask.assignee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className="font-medium">{mockJiraTask.priority}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{mockJiraTask.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Story Points</p>
                <p className="font-medium">
                  {mockJiraTask.storyPoints || "Not estimated"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
