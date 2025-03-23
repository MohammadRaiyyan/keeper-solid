/* @refresh reload */
import { QueryClientProvider } from "@tanstack/solid-query";
import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { render } from "solid-js/web";
import { Toaster } from "solid-toast";
import { queryClient } from "./api/queryclient.ts";
import "./App.css";
import LoaderProvider from "./context/LoaderProvider/index.tsx";
import { routeTree } from "./routeTree.gen";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Please provide root");
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}
render(
  () => (
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </LoaderProvider>
    </QueryClientProvider>
  ),
  root
);
