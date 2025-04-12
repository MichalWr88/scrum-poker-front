import { Task } from "@/src/components/jira/models/jira-task";
import { BaseService } from "../shared/baseService";

const url = process.env.MY_SERVER_URL || "http://localhost:8080";
type Token = string | null;

class MyServerProvider extends BaseService {
  private static instance: MyServerProvider;
  private token: Token = null;

  private constructor() {
    super();
  }

  public static getInstance(): MyServerProvider {
    if (!MyServerProvider.instance) {
      MyServerProvider.instance = new MyServerProvider();
    }
    return MyServerProvider.instance;
  }

  public async getToken(): Promise<Token> {
    if (this.token) return this.token;

    const response = await fetch(`${url}/api/user/login`, {
      method: "POST",
      headers: this.fetchHeaders,
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
      const response = await fetch(`${url}/api/jira/task/${id}`, {
        next: { revalidate: 10 },
        method: "POST",
        body: JSON.stringify({ fields: "" }),
        headers: this.mergeHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Error fetching task with id ${id}: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const myServerProvider = MyServerProvider.getInstance();
