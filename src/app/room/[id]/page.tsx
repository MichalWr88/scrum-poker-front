import { ScrumPokerRoom } from "@/components/scrum-poker-room";
import { PageProps } from "../../../../.next/types/app/page";

export default async function RoomPage(props: PageProps) {
  const bb = await props.params;

  return (
    <div className="h-screen flex-col overflow-auto p-3">
      <h1 className="text-2xl font-bold text-blue-900">
        Planning Poker: Room {bb.id}
      </h1>
      <ScrumPokerRoom />
    </div>
  );
}
