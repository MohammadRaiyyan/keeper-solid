import { Select } from "@kobalte/core/select";
import { clsx } from "clsx";
import type { IconTypes } from "solid-icons";
import { HiOutlineCheck, HiOutlineChevronDown } from "solid-icons/hi";
import type { Component } from "solid-js";
import type { BaseOptionType } from "../../types/tasks";

interface CustomSelectProps {
  options: BaseOptionType[];
  placeholder?: string;
  ariaLabel?: string;
  selected: BaseOptionType | null;
  setSelected: (option: BaseOptionType | null) => void;
  icon: IconTypes;
  outlined?: boolean;
}

const SelectComponent: Component<CustomSelectProps> = (props) => {
  return (
    <Select
      options={props.options}
      value={props.selected}
      onChange={(option) => {
        props.setSelected(option);
      }}
      class="w-full"
      optionValue="_id"
      optionTextValue="label"
      placeholder={props.placeholder}
      aria-label={props.ariaLabel}
      itemComponent={({ item }) => {
        return (
          <Select.Item
            item={item}
            class={clsx(
              "flex items-center justify-between px-3 h-9 rounded cursor-pointer  w-full outline-none",
              "hover:bg-base-100 ",
            )}
          >
            <Select.ItemLabel>{item.textValue}</Select.ItemLabel>
            <Select.ItemIndicator>
              <HiOutlineCheck />
            </Select.ItemIndicator>
          </Select.Item>
        );
      }}
    >
      <Select.Trigger
        class={clsx(
          props.outlined
            ? " focus-visible:outline focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
            : "outline-none",
          "flex items-center gap-2 justify-between min-w-42 w-full  rounded-md px-2 py-2 text-base h-10",
          " bg-base-100  transition duration-250",
        )}
      >
        <div class="flex items-center gap-2">
          <Select.Icon class="w-5 h-5 flex items-center justify-center">
            <props.icon size={16} color={props.selected?.color} />
          </Select.Icon>
          <Select.Value<BaseOptionType>>
            {(state) => state.selectedOption().label}
          </Select.Value>
        </div>
        <Select.Icon class="w-5 h-5 flex items-center justify-center">
          <HiOutlineChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="">
          <Select.Listbox class="rounded-md shadow-lg p-2 w-52 bg-base-200 max-h-56 overflow-y-auto" />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};

export default SelectComponent;
