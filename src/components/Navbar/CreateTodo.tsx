import type { DateValue } from "@ark-ui/solid";
import { HiOutlinePlus } from "solid-icons/hi";
import { createSignal } from "solid-js";
import type { DOMElement } from "solid-js/jsx-runtime";
import { createStore } from "solid-js/store";
import { useManifest } from "~/context/ManifestProvider/useManifest";
import { useCreateTask } from "~/hooks/tasks";
import type { BaseOptionType, TaskPayload } from "~/types/tasks";
import { ReusableDatePicker } from "../common/DatePicker";
import Input from "../common/Form/Input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Flex } from "../ui/flex";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldLabel,
  TextFieldTextArea,
} from "../ui/text-field";

type FormState = {
  state: {
    isCreating: boolean;
  };
  fields: {
    title: string;
    description: string;
    status: BaseOptionType | null;
    priority: BaseOptionType | null;
    dueOn: DateValue[] | undefined;
  };
};

const CreateTask = () => {
  const [{ manifest }] = useManifest();
  const [isOpen, setIsOpen] = createSignal(false);

  const InitialFormState = {
    fields: {
      title: "",
      description: "",
      priority: manifest()?.priorities[0] || null,
      dueOn: undefined,
      status: manifest()?.statuses[0] || null,
    },
    state: {
      isCreating: false,
    },
  };
  const [formState, setFormState] = createStore<FormState>(InitialFormState);

  const createTaskQuery = useCreateTask();

  const handleSubmit = async (
    e: SubmitEvent & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    },
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const payload = {
      title: formState.fields.title,
      description: formState.fields.description,
      priority: formState.fields.priority?._id,
      status: formState.fields.status?._id,
      dueOn: formState.fields.dueOn
        ? formState.fields.dueOn[0].toDate(
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          )
        : null,
    } satisfies TaskPayload;
    setFormState("state", "isCreating", true);
    await createTaskQuery.mutateAsync(payload, {
      onSuccess: () => {
        setFormState(InitialFormState);
        setIsOpen(false);
      },
      onError: () => {
        setFormState("state", "isCreating", false);
      },
    });
  };
  return (
    <Dialog open={isOpen()}>
      <DialogTrigger onClick={() => setIsOpen(!isOpen())}>
        <Button class="group">
          <HiOutlinePlus class="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          <span>Create Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Flex alignItems="start" justifyContent="between" class="gap-2">
            <div class="flex flex-col space-y-1.5">
              <DialogTitle class="font-medium text-xl">
                Create New Task
              </DialogTitle>
              <DialogDescription>
                Fill in the details to create new task
              </DialogDescription>
            </div>
            <DialogClose onClick={() => setIsOpen(!isOpen())} />
          </Flex>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div class=" space-y-6 pt-4 w-full">
            <Input
              value={formState.fields.title}
              type="text"
              handleInput={(value) => setFormState("fields", "title", value)}
              title="Title"
              placeholder="Task title"
              name="title"
            />

            <div class="grid grid-cols-2 gap-4 justify-between">
              <div class=" flex flex-col gap-1">
                <Select
                  id="status"
                  name="status"
                  options={manifest()?.statuses || []}
                  optionValue="_id"
                  optionTextValue="label"
                  value={formState.fields.status}
                  onChange={(value) => setFormState("fields", "status", value)}
                  placeholder="Select Status"
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>
                      {props.item.rawValue.label}
                    </SelectItem>
                  )}
                >
                  <SelectLabel>Status</SelectLabel>
                  <SelectTrigger>
                    <SelectValue<BaseOptionType>>
                      {({ selectedOption }) => selectedOption().label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
              <div class=" flex flex-col gap-1">
                <Select
                  id="priority"
                  options={manifest()?.priorities || []}
                  optionValue="_id"
                  optionTextValue="label"
                  value={formState.fields.priority}
                  onChange={(value) =>
                    setFormState("fields", "priority", value)
                  }
                  placeholder="Select Priority"
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>
                      {props.item.rawValue.label}
                    </SelectItem>
                  )}
                >
                  <SelectLabel>Priority</SelectLabel>
                  <SelectTrigger>
                    <SelectValue<BaseOptionType>>
                      {({ selectedOption }) => selectedOption().label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
            </div>
            <div class=" flex  flex-col gap-1">
              <ReusableDatePicker
                label="Due Date"
                placeholder="Pick a due date"
                class="w-full"
                onChange={(value) =>
                  setFormState("fields", "dueOn", value.value)
                }
                value={formState.fields.dueOn}
              />
            </div>

            <TextField
              onChange={(value) => setFormState("fields", "description", value)}
            >
              <TextFieldLabel class=" font-medium select-none">
                Description
              </TextFieldLabel>
              <TextFieldTextArea placeholder="Brief note about the task" />

              <TextFieldErrorMessage class=" text-rose-500" />
            </TextField>
            <div class="flex items-center gap-2 justify-end">
              <Button disabled={formState.state.isCreating} type="submit">
                Create Task
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
