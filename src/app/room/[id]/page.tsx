import JiraTask from "@/components/jira/jira-task";
import RoomWrapper from "@/components/room/room-wrapper";
import ActionButtons from "@/components/room/action-buttons";
import VotingArea from "@/components/room/voting-area";

export default async function RoomPage() {
  return (
    <div className="h-screen flex-col overflow-auto p-3">
      <RoomWrapper
        actionComponent={<ActionButtons />}
        votingComponent={<VotingArea />}
      >
        <JiraTask initialKey="AAA-2063" />
      </RoomWrapper>
    </div>
  );
}
