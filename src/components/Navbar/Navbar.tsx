import { type Component, Show } from "solid-js";
import { useManifest } from "../../context/ManifestProvider/useManifest";
import SearchMenu from "../common/Search";
import { Flex } from "../ui/flex";
import { ModeToggle } from "../ui/toggle-mode";
import CreateTask from "./CreateTodo";
import UserMenu from "./UserMenu";

const Navbar: Component = () => {
  const [meta] = useManifest();

  return (
    <header class="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md w-full">
      <Flex
        justifyContent="between"
        class=" h-16 items-center px-4 sm:px-6 gap-4"
      >
        <div class="flex-1 flex items-center justify-center">
          <SearchMenu />
        </div>
        <div class="flex items-center gap-4">
          <CreateTask />
          <ModeToggle />
          <Show when={meta.manifest()?.user}>
            <UserMenu user={meta.manifest()?.user!} />
          </Show>
        </div>
      </Flex>
    </header>
  );
};

export default Navbar;
