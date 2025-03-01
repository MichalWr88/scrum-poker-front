import { ScrumPokerRoom } from "@/components/scrum-poker-room";

const RoomPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div className=" h-screen flex-col overflow-auto p-3">
      <h1 className="text-3xl ">Room ID: {id}</h1>
      <ScrumPokerRoom />
    </div>
  );
};

export default RoomPage;
