import { auth } from "@/auth";
import scrumBackendService from "@/src/services/scrum-backend/scrum-backend.service";
import { redirect } from "next/navigation"; // Use "next/navigation" for Next.js 13/15
import RoomPathGuard from "./room-path-guard";

const RoomWrapper = async ({
  children,
  actionComponent,
  votingComponent,
}: {
  children: React.ReactNode;
  actionComponent: React.ReactNode;
  votingComponent: React.ReactNode;
}) => {
  const session = await auth();
  if (session === null) {
    redirect("/");
  }
  const rooms = await scrumBackendService.getRooms();
  console.log("Rooms:", rooms);
  return (
    <div className="flex gap-4 p-4 wrapper-footer-navbar">
      <RoomPathGuard rooms={rooms}>
        <>
          <div className="flex flex-col gap-6 flex-grow ">
            {/* Voting controls and action buttons */}
            <div className="flex justify-between items-center">
              {actionComponent}
            </div>

            {votingComponent}
          </div>

          <div className="bg-sky-50 border-l h-full">{children}</div>
        </>
      </RoomPathGuard>
    </div>
  );
};

export default RoomWrapper;
