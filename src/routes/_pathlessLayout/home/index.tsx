import { createFileRoute } from "@tanstack/solid-router";
import Home from "../../../pages/home";

export const Route = createFileRoute("/_pathlessLayout/home/")({
  component: Home,
});
