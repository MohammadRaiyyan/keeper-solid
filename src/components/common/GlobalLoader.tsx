import { type Component, Show, createEffect } from "solid-js";
import type { GlobalLoaderType } from "../../types/common";

const GlobalLoader: Component<GlobalLoaderType> = (props) => {
  createEffect(() => console.log("props.isLoading", props.isLoading));
  return (
    <Show when={props.isLoading} fallback={null}>
      <div class="flex justify-center items-center h-screen flex-col gap-4 fixed z-50 inset-0 bg-base-100/10 backdrop-blur-md w-full">
        <span class="loading loading-spinner loading-xl" />
        <Show when={props?.message}>
          <p>{props.message}</p>
        </Show>
      </div>
    </Show>
  );
};

export default GlobalLoader;
