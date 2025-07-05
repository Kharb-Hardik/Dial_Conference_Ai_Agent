"use client";

import { ErrorState } from "@/components/core/error-state";
import { LoadingState } from "@/components/core/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
};

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading meetings"
      description="This may take a few seconds..."
    />
  );
};

export const MeetingViewError = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Please try again later"
    />
  );
};
