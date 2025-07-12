import { EmptyState } from "@/components/core/empty-state";
import React from "react";


export const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-4 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting completed"
        description="The meetings has been completed and is under processing, its summary will be generated soon."
        image="/processing.svg"
      />
    </div>
  );
};
