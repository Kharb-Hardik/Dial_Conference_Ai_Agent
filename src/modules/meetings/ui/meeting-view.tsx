"use client";

import { ErrorState } from "@/components/core/error-state";
import { LoadingState } from "@/components/core/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { DataTable } from "@/components/core/data-table";
import { EmptyState } from "@/components/core/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingFilters } from "../hooks/use-meetings-filter";
import { DataPagination } from "@/components/core/data-pagination";

export const MeetingView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const [filters, setFilters] = useMeetingFilters();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({ ...filters }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {data.items.length !== 0 ? (
        <>
          <DataTable
            data={data.items}
            columns={columns}
            onRowClick={(row) => router.push(`/meetings/${row.id}`)}
          />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          />
        </>
      ) : (
        <EmptyState
          title="Create a meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time"
        />
      )}
    </div>
  );
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
