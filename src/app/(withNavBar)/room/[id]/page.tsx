import JiraTask from "@/src/components/jira/jira-task";
import RoomWrapper from "@/src/components/room/room-wrapper";
import ActionButtons from "@/src/components/room/action-buttons";
import VotingArea from "@/src/components/room/voting-area";
import { SessionProvider } from "next-auth/react";
import { initConnectMongo } from "@/src/services/mongodb/service";
import scrumBackendService from "@/src/services/scrum-backend/scrum-backend.provider";
import { PageProps } from "@/.next/types/app/page";

export default async function RoomPage(props: PageProps) {
  try {
    await initConnectMongo();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error connecting to Mongo:", error);
    }
  }
  const params = await props?.params;
  const roomData = await scrumBackendService.getRoom(params.id);
  return (
    <SessionProvider>
      <RoomWrapper
        actionComponent={<ActionButtons />}
        votingComponent={<VotingArea />}
      >
        <JiraTask taskId={roomData.lastSubject} />
      </RoomWrapper>
    </SessionProvider>
  );
}
