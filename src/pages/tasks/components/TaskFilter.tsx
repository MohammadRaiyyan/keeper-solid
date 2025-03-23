import { getRouteApi } from "@tanstack/solid-router";
import { HiOutlineFunnel, HiOutlineMagnifyingGlass } from "solid-icons/hi";
import { createMemo } from "solid-js";
import { Grid } from "~/components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { useManifest } from "~/context/ManifestProvider/useManifest";
import useDebounceValue from "~/hooks/utils/useDebounceValue";

const routeApi = getRouteApi("/_pathlessLayout/tasks/");
const TaskFilter = () => {
  const [{ manifest }] = useManifest();
  const routeSearch = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  const filterOptions = createMemo(() => {
    return {
      status: [
        "All Status",
        ...(manifest()?.statuses.map((status) => status.label) || []),
      ],
      priority: [
        "All Priority",
        ...(manifest()?.priorities.map((priority) => priority.label) || []),
      ],
      sortBy: ["Newest", "Oldest", "Priority", "Due Date"],
    };
  });

  const handleNavigate = (
    key: keyof ReturnType<typeof routeSearch>,
    value: string | null,
  ) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value || "" }),
    });
  };

  const debounceSearch = useDebounceValue((value) =>
    handleNavigate("search", value),
  );

  return (
    <div class="py-4 px-0 flex items-center gap-3">
      <div>
        <HiOutlineFunnel class="size-4" />
      </div>
      <Grid cols={4} class="gap-2">
        <div>
          <TextField
            value={debounceSearch.value()}
            onChange={debounceSearch.debounce}
            class="relative flex items-center flex-row"
          >
            <HiOutlineMagnifyingGlass class="size-4 absolute left-3" />
            <TextFieldInput placeholder="Search by task title" class="pl-10" />
          </TextField>
        </div>
        <div class=" flex flex-col gap-1">
          <Select
            id="status"
            name="status"
            options={filterOptions().status}
            value={routeSearch().status}
            onChange={(value) => handleNavigate("status", value)}
            placeholder="Select Status"
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {({ selectedOption }) => selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class=" flex flex-col gap-1">
          <Select
            id="priority"
            options={filterOptions().priority}
            value={routeSearch().priority}
            onChange={(value) => handleNavigate("priority", value)}
            placeholder="Select Priority"
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {({ selectedOption }) => selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div class=" flex flex-col gap-1">
          <Select
            id="priority"
            options={filterOptions().sortBy}
            value={routeSearch().sortBy}
            onChange={(value) => handleNavigate("sortBy", value)}
            placeholder="Sort By"
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {({ selectedOption }) => selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
      </Grid>
    </div>
  );
};

export default TaskFilter;
