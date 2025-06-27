import { AgentView, AgentViewLoading,AgentViewError } from '@/modules/agents/ui/views/agent-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react'

const page = () => {
  
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
  
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentViewLoading />}>
                <ErrorBoundary fallback={<AgentViewError />}>
                    <AgentView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page