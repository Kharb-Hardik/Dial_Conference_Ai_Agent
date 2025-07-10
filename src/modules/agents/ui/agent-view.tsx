"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import React, { useEffect } from "react";
import { LoadingState } from "@/components/core/loading-state";
import { ErrorState } from "@/components/core/error-state";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/core/empty-state";
import { useAgentFilters } from "../hooks/use-agent-filter";
import { DataPagination } from "../../../components/core/data-pagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/core/data-table";

export const AgentView = () => {
  const [filters, setFilters] = useAgentFilters();
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 mb:px-8 flex flex-col gap-y-4">
      {data.items.length !== 0 ? (
        <>
          <DataTable
            data={data.items}
            columns={columns}
            onRowClick={(row) => router.push(`/agents/${row.id}`)}
          />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          />
        </>
      ) : (
        <EmptyState
          title="Create an agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
};

export const AgentViewLoading = () => {
  return (
    <LoadingState
      title="Loading agents"
      description="This may take a few seconds..."
    />
  );
};

export const AgentViewError = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};
