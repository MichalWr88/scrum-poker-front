"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";

// Socket events enum
enum SocketEvents {
  // Connection events
  CONNECT = "connection",
  DISCONNECT = "disconnect",

  // Room events
  JOIN_ROOM = "join_room",
  LEAVE_ROOM = "leave_room",
  ROOM_USERS_UPDATED = "room_users_updated",

  // Voting events
  SEND_VOTE = "send_vote",
  VOTES_UPDATED = "votes_updated",
  CLEAR_ALL_VOTES = "clear_all_votes",
  CLEAR_MY_VOTE = "clear_my_vote",
  VOTES_CLEARED = "votes_cleared",
}

interface Vote {
  userId: string;
  userName: string;
  value: string | number | null;
}

export function ScrumPokerRoom() {
  const [participants, setParticipants] = useState<Vote[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [currentVote, setCurrentVote] = useState<string | number | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userName, setUsername] = useState(
    `User-${(Math.random() * 1000).toFixed(0)}`
  );
  const params = useParams();
  const roomId = params?.id as string;

  // Connect to socket when component mounts
  useEffect(() => {
    // Create socket connection
    const newSocket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
      {
        transports: ["websocket"],
        autoConnect: true,
      }
    );

    // Set up event handlers
    newSocket.on("connect", () => {
      console.log("Connected to socket server");

      // Join the room
      newSocket.emit(SocketEvents.JOIN_ROOM, {
        roomId,
        userName,
      });
    });

    // Listen for updated participants list
    newSocket.on(
      SocketEvents.ROOM_USERS_UPDATED,
      (updatedParticipants: Vote[]) => {
        setParticipants(updatedParticipants);
      }
    );

    // Listen for vote updates
    newSocket.on(SocketEvents.VOTES_UPDATED, (updatedParticipants: Vote[]) => {
      setParticipants(updatedParticipants);

      // Update current user's vote if changed from server
      const myVote = updatedParticipants.find((p) => p.userId === newSocket.id);
      if (myVote) {
        setCurrentVote(myVote.value);
      }
    });

    // Listen for vote clears
    newSocket.on(
      SocketEvents.VOTES_CLEARED,
      (clearType: "all" | "single", userId?: string) => {
        if (clearType === "all") {
          setCurrentVote(null);
        } else if (clearType === "single" && userId === newSocket.id) {
          setCurrentVote(null);
        }
      }
    );

    // Store socket in state
    setSocket(newSocket);

    // Clean up function
    return () => {
      if (newSocket) {
        newSocket.emit(SocketEvents.LEAVE_ROOM, { roomId });
        newSocket.disconnect();
      }
    };
  }, [roomId, userName]);

  // Function to handle when a user casts a vote
  const handleVote = (vote: string) => {
    setCurrentVote(vote);

    // Send vote to the server
    if (socket) {
      socket.emit(SocketEvents.SEND_VOTE, {
        roomId,
        vote,
      });
    }
  };

  // Toggle vote visibility
  const toggleVotes = () => {
    setRevealed(!revealed);
    // In a real implementation, you would emit an event to toggle votes
    // if (socket) {
    //   socket.emit("toggle-votes", {
    //     roomId,
    //     revealed: !revealed,
    //   });
    // }
  };

  // Clear all votes
  const clearAllVotes = () => {
    if (socket) {
      socket.emit(SocketEvents.CLEAR_ALL_VOTES, { roomId });
    }
  };

  // Clear my vote only
  const clearMyVote = () => {
    if (socket) {
      socket.emit(SocketEvents.CLEAR_MY_VOTE, { roomId });
      setCurrentVote(null);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (70%): Voting area and participants */}
      <div className="w-[70%] p-6 flex flex-col gap-6">


        {/* Voting controls and action buttons */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-blue-900">
            Your Vote:{" "}
            <span className="font-bold">{currentVote ?? "Not voted"}</span>
          </h2>
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
                  {participant.userId === socket?.id ? "(You)" : ""}
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
