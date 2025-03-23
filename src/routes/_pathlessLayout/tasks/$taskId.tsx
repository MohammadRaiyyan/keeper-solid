import { createFileRoute } from "@tanstack/solid-router";
import Task from "../../../pages/tasks/[id]";

export const Route = createFileRoute("/_pathlessLayout/tasks/$taskId")({
  component: Task,
});
