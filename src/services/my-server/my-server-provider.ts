import { Task } from "@/components/jira/models/jira-task";

const url = process.env.MY_SERVER_URL || "http://localhost:3000";

type Token = string | null;
const fetchHeaders = new Headers();
fetchHeaders.append("Content-Type", "application/json");
fetchHeaders.append("X-API-Key", process.env.X_API_KEY ?? "");

class MyServerProvider {
  private static instance: MyServerProvider;
  private token: Token = null;

  private constructor() {}

  public static getInstance(): MyServerProvider {
    if (!MyServerProvider.instance) {
      MyServerProvider.instance = new MyServerProvider();
    }
    return MyServerProvider.instance;
  }

  public async getToken(): Promise<Token> {
    if (!process.env.MY_SERVER_URL) {
      throw new Error("Missing env variables");
    }
    if (this.token) return this.token;

    const response = await fetch(`${url}/api/user/login`, {
      method: "POST",
      headers: fetchHeaders,
      body: JSON.stringify({
        email: process.env.MY_EMAIL,
        password: process.env.MY_PASSWORD,
        type: "local",
      }),
    });
    const responseJson = (await response.json()) as { accessToken: Token };
    this.token = responseJson.accessToken;
    return this.token;
  }
  public async getTaskById(id: string): Promise<Task> {
    try {
      if (!this.token) {
        this.token = await this.getToken();
      }
      this.updateHeadersToken();
      const response = await fetch(`${url}/api/jira/task/${id}`, {
        method: "POST",
        body: JSON.stringify({ fields: "" }),

        headers: { ...fetchHeaders, Authorization: `Bearer ${this.token}`,"Content-Type": "application/json" },
      });
      // if (!response.ok) {
      //   throw new Error(
      //     `Error fetching task with id ${id}: ${JSON.stringify(response.text())}`
      //   );
      // }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  private updateHeadersToken() {
    fetchHeaders.append("Authorization", `Bearer ${this.token}`);
  }
}

export const myServerProvider = MyServerProvider.getInstance();
