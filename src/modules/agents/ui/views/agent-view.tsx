"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import React from "react";
import { LoadingState } from "@/components/core/loading-state";
import { ErrorState } from "@/components/core/error-state";
import { DataTable } from "../../components/data-table";
import { columns } from "../../components/columns";
import { EmptyState } from "@/components/core/empty-state";
import { useAgentFilters } from "../../hooks/use-agent-filter";
import { DataPagination } from "../../components/data-pagination";

export const AgentView = () => {
  const [filters, setFilters] = useAgentFilters();
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
          <DataTable data={data.items} columns={columns} />
          <DataPagination
            page={filters.page}
            totalPages={data.totalPages}
            onPageChange={(page) => setFilters({ page })}
          />
        </>
      ) : (
        <EmptyState
          title="Create your first agent"
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
