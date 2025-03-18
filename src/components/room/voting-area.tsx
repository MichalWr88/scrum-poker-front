"use client";

import { socketService, Vote } from "@/src/services/socket/socket-service";
import StatisticsWrapper from "./statistics/statistics-wrapper";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const fibonacciVotes = [
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
];
// const tShirtVotes = ["XS", "S", "M", "L", "XL", "XXL"];

const VotingArea = () => {
  const { data: session } = useSession();
  const username = session?.user?.name ?? null;
  const [participants, setParticipants] = useState<Vote[]>([]);
  const [revealed] = useState(false);
  const [currentVote, setCurrentVote] = useState<string | number | null>(null);
  const params = useParams();
  const roomId = params?.id as string;

  useEffect(() => {
    if (!username) return;
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
    if (currentVote === vote) return;

    setCurrentVote(vote);
    socketService.sendVote(vote);
  };

  // Check if current user is participant with this ID
  const isCurrentUser = (userId: string) => {
    const socket = socketService.getSocket();
    return socket?.id === userId;
  };

  return (
    <>
      {/* Voting area */}
      <div className="bg-sky-100 p-6 rounded-lg shadow">
        <h3 className="text-sm font-semibold text-blue-900 mb-4">
          Select Your Estimate
        </h3>
        <div className="grid grid-cols-8 gap-2">
          {fibonacciVotes.map((value) => (
            <button
              key={value}
              onClick={() => handleVote(value)}
              className={`w-[60] py-2 text-center rounded-md font-bold transition-colors  ${
                currentVote === value
                  ? "bg-orange-500 text-white"
                  : "bg-white text-blue-900 border border-sky-200 hover:bg-sky-200 cursor-pointer"
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

          <ul className="space-y-3 grid grid-cols-2 gap-2">
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
        <StatisticsWrapper participants={participants} />
      </div>
    </>
  );
};

export default VotingArea;
