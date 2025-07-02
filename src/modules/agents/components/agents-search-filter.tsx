import React from "react";
import { useAgentFilters } from "../hooks/use-agent-filter";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters();
  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />

      <SearchIcon className="size-4 absolute left-4 top-1/2 -translate-1/2 text-muted-foreground" />
    </div>
  );
};
