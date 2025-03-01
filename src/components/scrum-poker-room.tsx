"use client";

import { useState } from "react";
// import { VotingArea } from "./voting-area";
// import { ParticipantList } from "./participant-list";

// Sample data - in a real app, this would come from a database or API
const initialParticipants = [
  { id: 1, username: "Alice", vote: null },
  { id: 2, username: "Bob", vote: "3" },
  { id: 3, username: "Charlie", vote: "5" },
  { id: 4, username: "David", vote: null },
  { id: 5, username: "You", vote: null },
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
        <h1 className="text-2xl font-bold text-blue-900">
          Planning Poker: {mockJiraTask.key}
        </h1>

        {/* Voting controls and reveal button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-blue-900">
            Your Vote:{" "}
            <span className="font-bold">{currentVote || "Not voted"}</span>
          </h2>
          <button
            onClick={toggleVotes}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            {revealed ? "Hide Votes" : "Reveal Votes"}
          </button>
        </div>

        {/* Voting area component */}
        <div className="bg-sky-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Select Your Estimate
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {[
              "0",
              "1",
              "2",
              "3",
              "5",
              "8",
              "13",
              "21",
              "34",
              "55",
              "89",
              "?",
            ].map((value) => (
              <button
                key={value}
                onClick={() => handleVote(value)}
                className={`py-3 px-4 text-center rounded-md font-bold transition-colors ${
                  currentVote === value
                    ? "bg-cyan-600 text-white"
                    : "bg-white text-blue-900 border border-sky-200 hover:bg-sky-200"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Participant list with votes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-blue-900">
              Participants
            </h2>
          </div>

          <ul className="space-y-3">
            {participants.map((participant) => (
              <li
                key={participant.id}
                className="flex items-center justify-between p-3 bg-sky-50 rounded-lg"
              >
                <span className="text-blue-900">{participant.username}</span>
                <span className="font-mono font-bold text-cyan-600">
                  {participant.vote
                    ? revealed
                      ? participant.vote
                      : "✓"
                    : "..."}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side (30%): Jira task details */}
      <div className="w-[30%] bg-sky-50 p-6 border-l border-sky-200">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">
            Task Details
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-sky-600">Key</p>
              <p className="font-medium text-blue-900">{mockJiraTask.key}</p>
            </div>

            <div>
              <p className="text-sm text-sky-600">Summary</p>
              <p className="font-medium text-blue-900">
                {mockJiraTask.summary}
              </p>
            </div>

            <div>
              <p className="text-sm text-sky-600">Description</p>
              <p className="text-sm text-blue-900">
                {mockJiraTask.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-sky-600">Assignee</p>
                <p className="font-medium text-blue-900">
                  {mockJiraTask.assignee}
                </p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Priority</p>
                <p className="font-medium text-blue-900">
                  {mockJiraTask.priority}
                </p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Status</p>
                <p className="font-medium text-blue-900">
                  {mockJiraTask.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Story Points</p>
                <p className="font-medium text-blue-900">
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
