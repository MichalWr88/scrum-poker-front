import { auth } from "@/auth";
import { redirect } from "next/navigation"; // Use "next/navigation" for Next.js 13/15

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

  return (
    <div className="flex h-full gap-4">
      <div className="w-4/6 flex flex-col gap-6">
        {/* Voting controls and action buttons */}
        <div className="flex justify-between items-center">
          {actionComponent}
        </div>

        {votingComponent}
      </div>

      <div className="w-3/6 bg-sky-50 border-l border-sky-200 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default RoomWrapper;
