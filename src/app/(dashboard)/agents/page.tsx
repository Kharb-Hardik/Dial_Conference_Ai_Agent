import {
  AgentView,
  AgentViewLoading,
  AgentViewError,
} from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import React, { Suspense } from "react";
import { AgentsListHeader } from "@/modules/agents/components/agents-list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const page = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading />}>
          <ErrorBoundary fallback={<AgentViewError />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
