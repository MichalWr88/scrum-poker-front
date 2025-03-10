const RoomWrapper = ({
  children,
  actionComponent,
  votingComponent,
}: {
  children: React.ReactNode;
  actionComponent: React.ReactNode;
  votingComponent: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen">
      {/* Left side (70%): Voting area and participants */}
      <div className="w-4/6 p-6 flex flex-col gap-6">
        {/* Voting controls and action buttons */}
        <div className="flex justify-between items-center">
          {actionComponent}
        </div>

        {votingComponent}
      </div>

      {/* Right side (30%): Jira task details */}
      <div className="w-3/6 bg-sky-50 p-6 border-l border-sky-200">
        {children}
      </div>
    </div>
  );
};

export default RoomWrapper;
