import { type ParentComponent, createSignal } from "solid-js";
import GlobalLoader from "../../components/common/GlobalLoader";
import type { GlobalLoaderType } from "../../types/common";
import LoaderContext, { type LoaderContextProps } from "./context";

const LoaderProvider: ParentComponent = (props) => {
  const [loaderState, setLoaderState] = createSignal<GlobalLoaderType>({
    isLoading: false,
    message: "Loading content",
  });
  const handleLoader = (state: boolean, message?: string) => {
    setLoaderState(() => ({ isLoading: state, message: message }));
  };
  const value: LoaderContextProps = [loaderState, { setLoader: handleLoader }];
  return (
    <LoaderContext.Provider value={value}>
      <GlobalLoader
        isLoading={loaderState().isLoading}
        message={loaderState().message}
      />
      {props.children}
    </LoaderContext.Provider>
  );
};
export default LoaderProvider;
