import { createFileRoute } from "@tanstack/solid-router";
import Profile from "~/pages/profile";

export const Route = createFileRoute("/_pathlessLayout/profile/")({
  component: Profile,
});
