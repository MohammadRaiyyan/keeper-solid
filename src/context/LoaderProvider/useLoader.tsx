import { useContext } from "solid-js";
import LoaderContext from "./context";

export default function useLoader() {
  const loaderContext = useContext(LoaderContext);
  if (!loaderContext) {
    throw new Error("useLoader must be used inside a context");
  }
  return loaderContext;
}
