import { Navigate, createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navigate to="/home" />;
}
