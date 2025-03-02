import { io, Socket } from "socket.io-client";

export enum SocketEvents {
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

export interface Vote {
  userId: string;
  userName: string;
  value: string | number | null;
}

export class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private roomId: string | null = null;
  private username: string | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /**
   * Initialize socket connection
   */
  public init(username: string, roomId: string): Socket {
    this.username = username;
    this.roomId = roomId;

    this.socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
      {
        transports: ["websocket"],
        autoConnect: true,
      }
    );

    // Set up connection events
    this.socket.on("connect", () => {
      console.log("Socket connected with ID:", this.socket?.id);
      this.joinRoom();
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    this.socket.on("error", (error: any) => {
      console.error("Socket error:", error);
    });

    return this.socket;
  }

  /**
   * Get the current socket instance
   */
  public getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Disconnect socket and clean up
   */
  public disconnect(): void {
    if (this.socket) {
      this.leaveRoom();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Join a room
   */
  public joinRoom(): void {
    if (!this.socket || !this.roomId || !this.username) {
      console.error(
        "Cannot join room: Socket not initialized or missing roomId/username"
      );
      return;
    }

    this.socket.emit(SocketEvents.JOIN_ROOM, {
      roomId: this.roomId,
      username: this.username,
    });
  }

  /**
   * Leave the current room
   */
  public leaveRoom(): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot leave room: Socket not initialized or missing roomId"
      );
      return;
    }

    this.socket.emit(SocketEvents.LEAVE_ROOM, { roomId: this.roomId });
  }

  /**
   * Send a vote to the server
   */
  public sendVote(vote: string | number): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot send vote: Socket not initialized or missing roomId"
      );
      return;
    }

    this.socket.emit(SocketEvents.SEND_VOTE, {
      roomId: this.roomId,
      vote,
    });
  }

  /**
   * Clear all votes in the room
   */
  public clearAllVotes(): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot clear votes: Socket not initialized or missing roomId"
      );
      return;
    }

    this.socket.emit(SocketEvents.CLEAR_ALL_VOTES, { roomId: this.roomId });
  }

  /**
   * Clear only the current user's vote
   */
  public clearMyVote(): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot clear vote: Socket not initialized or missing roomId"
      );
      return;
    }

    this.socket.emit(SocketEvents.CLEAR_MY_VOTE, { roomId: this.roomId });
  }

  /**
   * Listen for room users updated events
   */
  public onRoomUsersUpdated(callback: (users: Vote[]) => void): void {
    if (!this.socket) {
      console.error("Cannot add listener: Socket not initialized");
      return;
    }

    this.socket.on(SocketEvents.ROOM_USERS_UPDATED, callback);
  }

  /**
   * Listen for votes updated events
   */
  public onVotesUpdated(callback: (users: Vote[]) => void): void {
    if (!this.socket) {
      console.error("Cannot add listener: Socket not initialized");
      return;
    }

    this.socket.on(SocketEvents.VOTES_UPDATED, callback);
  }

  /**
   * Listen for votes cleared events
   */
  public onVotesCleared(
    callback: (clearType: "all" | "single", userId?: string) => void
  ): void {
    if (!this.socket) {
      console.error("Cannot add listener: Socket not initialized");
      return;
    }

    this.socket.on(SocketEvents.VOTES_CLEARED, callback);
  }

  /**
   * Remove a specific event listener
   */
  public removeListener(event: SocketEvents): void {
    if (!this.socket) return;
    this.socket.off(event);
  }

  /**
   * Remove all event listeners
   */
  public removeAllListeners(): void {
    if (!this.socket) return;
    this.socket.removeAllListeners();
  }
}

// Create singleton instance for export
export const socketService = SocketService.getInstance();
