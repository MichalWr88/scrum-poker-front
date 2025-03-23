import JiraTask from "@/src/components/jira/jira-task";
import RoomWrapper from "@/src/components/room/room-wrapper";
import ActionButtons from "@/src/components/room/action-buttons";
import VotingArea from "@/src/components/room/voting-area";
import { SessionProvider } from "next-auth/react";
import { initConnectMongo } from "@/src/services/mongodb/service";

export default async function RoomPage() {
  try {
    await initConnectMongo();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error connecting to Mongo:", error);
    }
  }

  return (
    <SessionProvider>
      <RoomWrapper
        actionComponent={<ActionButtons />}
        votingComponent={<VotingArea />}
      >
        <JiraTask />
      </RoomWrapper>
    </SessionProvider>
  );
}
