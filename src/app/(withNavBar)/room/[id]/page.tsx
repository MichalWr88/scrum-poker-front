import JiraTask from "@/src/components/jira/jira-task";
import RoomWrapper from "@/src/components/room/room-wrapper";
import ActionButtons from "@/src/components/room/action-buttons";
import VotingArea from "@/src/components/room/voting-area";
import { SessionProvider } from "next-auth/react";

export default async function RoomPage() {
  return (
    <SessionProvider>
      <div className="h-full flex-col overflow-auto p-3">
        <RoomWrapper
          actionComponent={<ActionButtons />}
          votingComponent={<VotingArea />}
        >
          <JiraTask initialKey="AAA-2063" />
        </RoomWrapper>
      </div>
    </SessionProvider>
  );
}
