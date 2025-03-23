import { Link } from "@tanstack/solid-router";
import { type Component, For, type JSX, Show, createSignal } from "solid-js";
import type { DropdownItem } from "../../types/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type BasePlacement = "top" | "bottom" | "left" | "right";
type Placement =
  | BasePlacement
  | `${BasePlacement}-start`
  | `${BasePlacement}-end`;

type DropdownProps = {
  header?: JSX.Element;
  trigger: JSX.Element;
  triggerClass?: string;
  items: {
    main: DropdownItem[];
    footer?: DropdownItem[];
  };
  placement?: Placement;
  menuClass?: string;
};

const MenuItem: Component<{ item: DropdownItem }> = (props) => {
  const Icon = props.item.icon;
  if (props.item.as === "button") {
    return (
      <DropdownMenuItem
        as="button"
        onClick={props.item.onClick}
        class="px-4 py-2 w-full hover:bg-base-200 cursor-pointer flex items-center gap-2"
      >
        {Icon && <Icon size={16} />}
        {props.item.title}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      as={Link}
      href={props.item.href}
      class="px-4 py-2 hover:bg-base-200 cursor-pointer flex items-center gap-2"
    >
      {Icon && <Icon size={16} />}
      {props.item.title}
    </DropdownMenuItem>
  );
};

const Dropdown: Component<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <DropdownMenu
      open={isOpen()}
      onOpenChange={setIsOpen}
      flip
      placement={props.placement}
    >
      <DropdownMenuTrigger class={`${props.triggerClass ?? ""}`}>
        {props.trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        class={`  min-w-52 w-max bg-popover text-popover-foreground  rounded-xl overflow-hidden shadow-lg ${props.menuClass}`}
      >
        <Show when={props.header}>
          {props.header}
          <DropdownMenuSeparator />
        </Show>
        <For each={props.items.main}>{(item) => <MenuItem item={item} />}</For>
        <DropdownMenuSeparator />
        <For each={props.items.footer}>
          {(item) => <MenuItem item={item} />}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
