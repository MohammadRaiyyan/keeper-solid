import { type Accessor, createContext } from "solid-js";
import type { Manifest } from "../../types/common";
export type ManifestContextProps = [
  {
    manifest: Accessor<Manifest | undefined>;
  },
  {
    setManifest: (user: Manifest | undefined) => void;
  },
];
export const ManifestContext = createContext<ManifestContextProps>();
