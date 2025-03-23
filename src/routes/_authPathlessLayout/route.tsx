import { Outlet, createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/_authPathlessLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
