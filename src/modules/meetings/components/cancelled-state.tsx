import { EmptyState } from "@/components/core/empty-state";
import React from "react";


export const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-4 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting was cancelled"
        description=""
        image="/cancelled.svg"
      />
    </div>
  );
};
