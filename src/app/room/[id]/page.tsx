import { ScrumPokerRoom } from "@/components/scrum-poker-romm";
import { VotingArea } from "@/components/voting-area";

const RoomPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className="flex items-center justify-center h-screen ">
      <h1 className="text-3xl ">Room ID: {id}</h1>
      <ScrumPokerRoom />
    </div>
  );
};

export default RoomPage;
