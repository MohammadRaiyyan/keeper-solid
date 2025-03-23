import { HiOutlineMagnifyingGlass } from "solid-icons/hi";
import { createEffect, createSignal, onCleanup } from "solid-js";
import { Button } from "../ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "../ui/command";

export default function SearchMenu() {
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    onCleanup(() => {
      document.removeEventListener("keydown", down);
    });
  });

  return (
    <>
      <Button
        variant="outline"
        size="default"
        class="w-96 flex items-center justify-between gap-2 hover:bg-muted"
        onClick={() => setOpen(!open())}
      >
        <span class="flex items-center gap-2 text-muted-foreground">
          {" "}
          <HiOutlineMagnifyingGlass size={16} /> <span>
            Search Task...
          </span>{" "}
        </span>
        <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span class="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}
