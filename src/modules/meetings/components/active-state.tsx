import { EmptyState } from "@/components/core/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-4 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting is active"
        description="Meeting will end once all participants have left."
        image="/upcoming.svg"
      />
      <div>
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
