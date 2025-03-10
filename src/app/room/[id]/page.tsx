import { PageProps } from "../../../../.next/types/app/page";
import JiraTask from "@/components/jira/jira-task";
import RoomWrapper from "@/components/room/room-wrapper";
import ActionButtons from "@/components/room/action-buttons";
import VotingArea from "@/components/room/voting-area";

export default async function RoomPage(props: PageProps) {
  const params = await props.params;

  return (
    <div className="h-screen flex-col overflow-auto p-3">
      <h1 className="text-2xl font-bold text-blue-900">
        Planning Poker: Room {params.id}
      </h1>
      <RoomWrapper
        actionComponent={<ActionButtons />}
        votingComponent={<VotingArea />}
      >
        <JiraTask initialKey="AAA-2063" />
      </RoomWrapper>
    </div>
  );
}
