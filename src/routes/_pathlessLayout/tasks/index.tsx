import { createFileRoute } from "@tanstack/solid-router";
import Tasks from "../../../pages/tasks";

type TaskSearch = {
  status: string;
  priority: string;
  sortBy: string;
  search: string;
};

export const Route = createFileRoute("/_pathlessLayout/tasks/")({
  component: Tasks,
  validateSearch: (search: Record<string, unknown>): TaskSearch => {
    return {
      status: (search?.status as string) || "All Status",
      priority: (search?.priority as string) || "All Priority",
      sortBy: (search?.sortBy as string) || "Newest",
      search: (search?.search as string) || "",
    };
  },
});
