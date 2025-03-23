import { createFileRoute } from "@tanstack/solid-router";
import Login from "../../pages/authentication/login";

export const Route = createFileRoute("/_authPathlessLayout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
