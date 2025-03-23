import { type Component, JSX, Show } from "solid-js";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";

type InputProps = {
  name: string;
  placeholder: string;
  type: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
  value: string;
  title?: string;
  error?: string;
  handleInput: (value: string) => void;
  outlined?: boolean;
  className?: string;
};
const Input: Component<InputProps> = (props) => {
  return (
    <TextField
      class="flex flex-col gap-1"
      name="email"
      value={props.value}
      onChange={props.handleInput}
      validationState={props.error ? "invalid" : "valid"}
    >
      <Show when={props.title}>
        <TextFieldLabel class="mb-1">{props.title}</TextFieldLabel>
      </Show>
      <TextFieldInput
        type={props.type as any}
        placeholder={props.placeholder}
      />
      <TextFieldErrorMessage class=" text-rose-500">
        {props.error}
      </TextFieldErrorMessage>
    </TextField>
  );
};

export default Input;
