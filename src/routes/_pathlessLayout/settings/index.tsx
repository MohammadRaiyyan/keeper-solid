import { createFileRoute } from "@tanstack/solid-router";
import Settings from "~/pages/settings";

export const Route = createFileRoute("/_pathlessLayout/settings/")({
  component: Settings,
});
