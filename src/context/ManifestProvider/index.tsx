import { useLocation } from "@tanstack/solid-router";
import {
  type ParentComponent,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import GlobalLoader from "../../components/common/GlobalLoader";
import { publicPaths } from "../../constants/routes";
import useManifest from "../../hooks/manifest";
import type { Manifest } from "../../types/common";
import { ManifestContext, type ManifestContextProps } from "./context";

const ManifestProvider: ParentComponent = (props) => {
  const location = useLocation();
  const [manifest, setManifest] = createSignal<Manifest | undefined>(undefined);
  const value: ManifestContextProps = [{ manifest }, { setManifest }];

  const isPublicRoute = createMemo(() =>
    publicPaths.includes(location().pathname),
  );
  const manifestQuery = useManifest(!isPublicRoute());

  createEffect(async () => {
    if (manifestQuery.data) {
      setManifest(manifestQuery.data.data);
    }
  });

  return (
    <Show when={!manifestQuery.isLoading} fallback={<GlobalLoader isLoading />}>
      <ManifestContext.Provider value={value}>
        {props.children}
      </ManifestContext.Provider>
    </Show>
  );
};

export default ManifestProvider;
