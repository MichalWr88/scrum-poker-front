import { ScrumPokerRoom } from "@/components/scrum-poker-room";

const RoomPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className=" h-screen flex-col overflow-auto p-3">
      <h1 className="text-2xl font-bold text-blue-900">
        Planning Poker: Room {id}
      </h1>
      <ScrumPokerRoom />
    </div>
  );
};

export default RoomPage;
