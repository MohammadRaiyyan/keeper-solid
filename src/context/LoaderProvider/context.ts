import { type Accessor, createContext } from "solid-js";
export type LoaderContextProps = [
  Accessor<{
    isLoading: boolean;
    message?: string;
  }>,
  {
    setLoader: (state: boolean, message?: string) => void;
  },
];
const LoaderContext = createContext<LoaderContextProps>();
export default LoaderContext;
