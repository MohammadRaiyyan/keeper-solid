import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from "@kobalte/core";
import { Outlet, createRootRoute } from "@tanstack/solid-router";
import GlobalLoader from "../components/common/GlobalLoader";
import NotFound from "../pages/error/notFound";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => {
    return <NotFound />;
  },
  pendingComponent: () => {
    return <GlobalLoader isLoading />;
  },
});

function RootLayout() {
  const storageManager = createLocalStorageManager("vite-ui-theme");

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <Outlet />
      </ColorModeProvider>
    </>
  );
}
