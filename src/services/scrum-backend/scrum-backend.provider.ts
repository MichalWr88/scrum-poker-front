import { BaseService } from "../shared/baseService";

const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3002";
const mongoApiPath = "/api/mongo";

class ScrumBackendService extends BaseService {
  // Rooms endpoints

  async getRooms(): Promise<{ _id: string; name: string }[]> {
    try {
      const res = await fetch(`${BASE_URL}${mongoApiPath}/rooms`, {
        next: { revalidate: 86400 },
        headers: this.fetchHeaders,
      });
      if (!res.ok) {
        const errorInfo = await res.json();
        throw new Error(
          `Failed to fetch rooms: ${errorInfo.message || "Unknown error"}`
        );
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  }

  async addRoom(roomData: unknown): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room`, {
      method: "POST",
      headers: this.fetchHeaders,
      body: JSON.stringify(roomData),
    });
    if (!res.ok) throw new Error("Failed to add room");
    return res.json();
  }

  async getRoom(roomId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room/${roomId}`, {
      headers: this.fetchHeaders,
    });
    if (!res.ok) throw new Error(`Failed to fetch room ${roomId}`);
    return res.json();
  }

  async editRoom(roomId: string, updateData: unknown): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room/${roomId}`, {
      method: "PATCH",
      headers: this.fetchHeaders,
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error(`Failed to update room ${roomId}`);
    return res.json();
  }

  async deleteRoom(roomId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room/${roomId}`, {
      method: "DELETE",
      headers: this.fetchHeaders,
    });
    if (!res.ok) throw new Error(`Failed to delete room ${roomId}`);
    return res.json();
  }

  // Subjects endpoints

  async getAllSubjects(): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subjects`, {
      headers: this.fetchHeaders,
    });
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return res.json();
  }

  async addSubject(subjectId: string, subjectData: unknown): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subject/${subjectId}`, {
      method: "POST",
      headers: this.fetchHeaders,
      body: JSON.stringify(subjectData),
    });
    if (!res.ok) throw new Error(`Failed to add subject ${subjectId}`);
    return res.json();
  }

  async getSubject(subjectId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subject/${subjectId}`, {
      headers: this.fetchHeaders,
    });
    if (!res.ok) throw new Error(`Failed to fetch subject ${subjectId}`);
    return res.json();
  }

  // Votes endpoints

  async addOrUpdateVoteToSubject(
    subjectId: string,
    voteData: unknown
  ): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subject/${subjectId}/vote`, {
      method: "POST",
      headers: this.fetchHeaders,
      body: JSON.stringify(voteData),
    });
    if (!res.ok)
      throw new Error(`Failed to update vote for subject ${subjectId}`);
    return res.json();
  }

  async getUserVotes(userId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/user/${userId}/votes`, {
      headers: this.fetchHeaders,
    });
    if (!res.ok) throw new Error(`Failed to fetch votes for user ${userId}`);
    return res.json();
  }
}

// Create and export a singleton instance
const scrumBackendService = new ScrumBackendService();
export default scrumBackendService;
