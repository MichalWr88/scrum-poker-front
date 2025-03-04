"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { socketService, Vote } from "../services/socket/socket-service";

export function ScrumPokerRoom() {
  const [participants, setParticipants] = useState<Vote[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [currentVote, setCurrentVote] = useState<string | number | null>(null);
  const [username] = useState(`User-${(Math.random() * 1000).toFixed(0)}`);
  const params = useParams();
  const roomId = params?.id as string;
  console.log("render22");
  // Set up socket connection and event listeners
  useEffect(() => {
    console.log("render");
    // Initialize socket connection
    socketService.init(username, roomId);

    // Set up listeners
    socketService.onRoomUsersUpdated((updatedParticipants) => {
      setParticipants(updatedParticipants);
    });

    socketService.onVotesUpdated((updatedParticipants) => {
      setParticipants(updatedParticipants);

      // Update current user's vote if changed from server
      const socket = socketService.getSocket();
      if (socket) {
        const myVote = updatedParticipants.find((p) => p.userId === socket.id);
        if (myVote) {
          setCurrentVote(myVote.value);
        }
      }
    });

    socketService.onVotesCleared((clearType, userId) => {
      const socket = socketService.getSocket();
      if (clearType === "all") {
        setCurrentVote(null);
      } else if (clearType === "single" && socket && userId === socket.id) {
        setCurrentVote(null);
      }
    });

    // Clean up on unmount
    return () => {
      socketService.disconnect();
      socketService.removeAllListeners();
    };
  }, [roomId, username]);

  // Function to handle when a user casts a vote
  const handleVote = (vote: string) => {
    console.log(vote);
    setCurrentVote(vote);
    socketService.sendVote(vote);
  };

  // Toggle vote visibility
  const toggleVotes = () => {
    setRevealed(!revealed);
    socketService.toggleVotes();
  };

  // Clear all votes
  const clearAllVotes = () => {
    socketService.clearAllVotes();
  };

  // Clear my vote only
  const clearMyVote = () => {
    socketService.clearMyVote();
    setCurrentVote(null);
  };

  // Check if current user is participant with this ID
  const isCurrentUser = (userId: string) => {
    const socket = socketService.getSocket();
    return socket?.id === userId;
  };

  return (
    <div className="flex h-screen">
      {/* Left side (70%): Voting area and participants */}
      <div className="w-[70%] p-6 flex flex-col gap-6">
        {/* Voting controls and action buttons */}
        <div className="flex justify-between items-center">
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
        </div>

        {/* Voting area */}
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
                    ? "bg-orange-500 text-white"
                    : "bg-white text-blue-900 border border-sky-200 hover:bg-sky-200"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-6">
          {/* Participant list with votes */}
          <div className="bg-white rounded-lg shadow p-6 flex-3/4">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold text-blue-900">
                Participants ({participants.length})
              </h2>
            </div>

            <ul className="space-y-3">
              {participants.map((participant) => (
                <li
                  key={participant.userId}
                  className="flex items-center justify-between p-3 bg-sky-50 rounded-lg"
                >
                  <span className="text-blue-900">
                    {participant.userName}{" "}
                    {isCurrentUser(participant.userId) ? "(You)" : ""}
                  </span>
                  <span className="font-mono font-bold text-cyan-600">
                    {participant.value
                      ? revealed
                        ? participant.value
                        : "✓"
                      : "..."}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Statistics
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-sky-600">Average</p>
                <p className="font-medium text-blue-900">
                  {participants
                    .filter((p) => !!p.value)
                    .reduce(
                      (sum, p) => sum + ((p.value && parseFloat(p.value.toString())) || 0),
                      0
                    ) / participants.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Median</p>
                <p className="font-medium text-blue-900">
                  {
                    participants
                      .filter((p) => !!p.value)
                      .map((p) => p.value !== null ? parseFloat(p.value.toString()) : 0)
                      .sort((a, b) => a - b)[
                      Math.floor(participants.length / 2)
                    ]
                  }
                </p>
              </div>
            </div>
          </div>
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
              <p className="font-medium text-blue-900">SCRUM-123</p>
            </div>

            <div>
              <p className="text-sm text-sky-600">Summary</p>
              <p className="font-medium text-blue-900">
                Implement user authentication flow
              </p>
            </div>

            <div>
              <p className="text-sm text-sky-600">Description</p>
              <p className="text-sm text-blue-900">
                Create a secure authentication system with login, registration,
                and password reset functionality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-sky-600">Assignee</p>
                <p className="font-medium text-blue-900">Alice</p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Priority</p>
                <p className="font-medium text-blue-900">High</p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Status</p>
                <p className="font-medium text-blue-900">To Do</p>
              </div>
              <div>
                <p className="text-sm text-sky-600">Story Points</p>
                <p className="font-medium text-blue-900">Not estimated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
