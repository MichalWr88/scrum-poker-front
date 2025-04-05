const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3002";
const mongoApiPath = "/api/mongo";
class ScrumBackendService {
  // Rooms endpoints

  async getRooms(): Promise<
    {
      _id: string;
      name: string;
    }[]
  > {
    try {
      const res = await fetch(`${BASE_URL}${mongoApiPath}/rooms`, {
        next: { revalidate: 86400 },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    if (!res.ok) throw new Error("Failed to add room");
    return res.json();
  }

  async getRoom(roomId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room/${roomId}`);
    if (!res.ok) throw new Error(`Failed to fetch room ${roomId}`);
    return res.json();
  }

  async editRoom(roomId: string, updateData: unknown): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room/${roomId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error(`Failed to update room ${roomId}`);
    return res.json();
  }

  async deleteRoom(roomId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/room/${roomId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete room ${roomId}`);
    return res.json();
  }

  // Subjects endpoints

  async getAllSubjects(): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subjects`);
    if (!res.ok) throw new Error("Failed to fetch subjects");
    return res.json();
  }

  async addSubject(subjectId: string, subjectData: unknown): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subject/${subjectId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subjectData),
    });
    if (!res.ok) throw new Error(`Failed to add subject ${subjectId}`);
    return res.json();
  }

  async getSubject(subjectId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/subject/${subjectId}`);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voteData),
    });
    if (!res.ok)
      throw new Error(`Failed to update vote for subject ${subjectId}`);
    return res.json();
  }

  async getUserVotes(userId: string): Promise<unknown> {
    const res = await fetch(`${BASE_URL}/user/${userId}/votes`);
    if (!res.ok) throw new Error(`Failed to fetch votes for user ${userId}`);
    return res.json();
  }
}

// Create and export a singleton instance
const scrumBackendService = new ScrumBackendService();
export default scrumBackendService;
