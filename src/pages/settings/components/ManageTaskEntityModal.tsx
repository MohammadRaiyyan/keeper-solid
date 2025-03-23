import { type Component, Show, createMemo } from "solid-js";
import Input from "~/components/common/Form/Input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ManageTaskEntityModalTitle } from "../helper";

type ManageTaskEntityModalProps = {
  open: boolean;
  setIsOpen: (state: boolean) => void;
  entity: "STATUS" | "PRIORITY" | "LABEL";
  actionType: "UPDATE" | "ADD" | "DELETE";
};

const ManageTaskEntityModal: Component<ManageTaskEntityModalProps> = (
  props,
) => {
  const InputLabel = createMemo(() => {
    return (
      props.entity.charAt(0) + props.entity.substring(1).toLocaleLowerCase()
    );
  });
  const modalTitle = createMemo(() => {
    return props.actionType !== "DELETE"
      ? ManageTaskEntityModalTitle[props.entity][props.actionType]
      : `${ManageTaskEntityModalTitle[props.entity][props.actionType].title} ?`;
  });

  return (
    <Dialog open={props.open} onOpenChange={props.setIsOpen}>
      <DialogContent class="w-80">
        <DialogHeader>
          <DialogTitle>{modalTitle()}</DialogTitle>
          <Show when={props.actionType === "DELETE"}>
            <DialogDescription>
              {props.actionType === "DELETE" &&
                ManageTaskEntityModalTitle[props.entity][props.actionType]
                  ?.description}
            </DialogDescription>
          </Show>
        </DialogHeader>
        <form class="space-y-4">
          <Show
            when={props.actionType !== "DELETE"}
            fallback={
              <Button class="w-full" variant="destructive">
                Delete
              </Button>
            }
          >
            <Input
              type="text"
              value=""
              name={props.entity}
              title={InputLabel()}
              handleInput={() => {}}
              placeholder={`Enter ${InputLabel()}`}
            />
            <Input
              type="color"
              value=""
              name="color"
              title="Choose Color"
              handleInput={() => {}}
              placeholder=""
            />
            <Button class="w-full">
              {props.actionType === "ADD" ? "Create" : "Update"}
            </Button>
          </Show>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTaskEntityModal;
