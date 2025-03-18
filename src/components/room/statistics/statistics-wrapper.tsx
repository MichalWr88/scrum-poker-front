import { Vote } from "@/src/services/socket/socket-service";
import React from "react";

type Props = {
  participants: Vote[];
};
const countAverage = (participants: Vote[]) => {
  return (
    participants
      .filter((p) => !!p.value)
      .reduce(
        (sum, p) => sum + ((p.value && parseFloat(p.value.toString())) || 0),
        0
      ) / participants.length
  ).toFixed(1);
};

const StatisticsWrapper = ({ participants }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Statistics</h2>
      {participants.length > 0 && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-sky-600">Average</p>
            <p className="font-medium text-blue-900">
              {countAverage(participants)}
            </p>
          </div>
          <div>
            <p className="text-sm text-sky-600">Median</p>
            <p className="font-medium text-blue-900">
              {
                participants
                  .filter((p) => !!p.value)
                  .map((p) =>
                    p.value !== null ? parseFloat(p.value.toString()) : 0
                  )
                  .sort((a, b) => a - b)[Math.floor(participants.length / 2)]
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsWrapper;
