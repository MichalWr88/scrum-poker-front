import { Task } from "@/src/components/jira/models/jira-task";
import { User } from "next-auth";
import { io, Socket } from "socket.io-client";
import { RoomConfig, SocketEventPayloads, SocketEvents } from "./models";

type PartialUser = Required<Pick<User, "name" | "email" | "dbId" | "role">>;

export class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private roomId: string | null = null;
  private user: PartialUser | null = null;

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
  public init(user: PartialUser, roomId: string): Socket {
    this.user = user;
    this.roomId = roomId;

    this.socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3002",
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

    this.socket.on("error", (error: unknown) => {
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
   * Emit an event indicating a new task is pending
   */
  public emitPendingNewTask(): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot emit pending new task: Socket not initialized or missing roomId"
      );
      return;
    }
    this.emitHandler(SocketEvents.PENDING_NEW_TASK, {
      roomId: this.roomId,
    });
  }
  public onIsPendingNewTask(
    callback: (
      task: SocketEventPayloads[SocketEvents.IS_PENDING_NEW_TASK]
    ) => void
  ): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot emit pending new task: Socket not initialized or missing roomId"
      );
      return;
    }
    this.onHandler(SocketEvents.IS_PENDING_NEW_TASK, callback);
  }
  /**
   * Emit an event indicating a new task has been fetched
   */
  public emitFetchedNewTask(task: Task): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot emit fetched new task: Socket not initialized or missing roomId"
      );
      return;
    }
    this.emitHandler(SocketEvents.FETCHED_NEW_TASK, {
      roomId: this.roomId,
      task,
    });
  }
  public onIsFetchedNewTask(callback: (task: Task) => void): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot emit fetched new task: Socket not initialized or missing roomId"
      );
      return;
    }
    this.socket.on(SocketEvents.FETCHED_NEW_TASK, callback);
  }
  /**
   * Join a room
   */
  public joinRoom(): void {
    if (!this.socket || !this.roomId || !this.user) {
      console.error(
        "Cannot join room: Socket not initialized or missing roomId/user"
      );
      return;
    }
    this.emitHandler(SocketEvents.JOIN_ROOM, {
      roomId: this.roomId,
      user: this.user,
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
    this.emitHandler(SocketEvents.LEAVE_ROOM, {
      roomId: this.roomId,
    });
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
    this.emitHandler(SocketEvents.SEND_VOTE, {
      roomId: this.roomId,
      vote,
    });
  }
  /**
   * Toggle votes visibility in the room
   */
  public toggleVotes(show: boolean): void {
    if (!this.socket || !this.roomId) {
      console.error(
        "Cannot toggle votes: Socket not initialized or missing roomId"
      );
      return;
    }
    this.emitHandler(SocketEvents.TOGGLE_VOTES, {
      roomId: this.roomId,
      show,
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
    this.emitHandler(SocketEvents.CLEAR_ALL_VOTES, {
      roomId: this.roomId,
    });
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
    this.emitHandler(SocketEvents.CLEAR_MY_VOTE, {
      roomId: this.roomId,
    });
  }

  /**
   * Listen for room users updated events
   */
  public onRoomUsersUpdated(
    callback: (users: RoomConfig["votes"]) => void
  ): void {
    if (!this.socket) {
      console.error("Cannot add listener: Socket not initialized");
      return;
    }

    this.socket.on(SocketEvents.ROOM_USERS_UPDATED, callback);
  }

  /**
   * Listen for votes updated events
   */
  public onVotesUpdated(callback: (users: RoomConfig["votes"]) => void): void {
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
  private emitHandler<T extends SocketEvents>(
    event: T,
    payload: SocketEventPayloads[T]
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }
    this.socket.emit(event, payload);
  }
  private onHandler<T extends SocketEvents>(
    event: T,
    callback: (payload: SocketEventPayloads[T]) => void
  ): void {
    if (!this.socket) {
      console.error("Socket not initialized");
      return;
    }
    this.socket.on(event as never, callback as (...args: unknown[]) => void);
  }
}

// Create singleton instance for export
export const socketService = SocketService.getInstance();
