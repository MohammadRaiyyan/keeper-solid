import { createFileRoute } from "@tanstack/solid-router";
import Register from "../../pages/authentication/register";

export const Route = createFileRoute("/_authPathlessLayout/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Register />;
}
