import { useContext } from "solid-js";
import { ManifestContext } from "./context";

export const useManifest = () => {
  const context = useContext(ManifestContext);
  if (!context) {
    throw new Error(
      "Please make sure entry point is wrapped in the manifest provider before accessing the context!",
    );
  }
  return context;
};
