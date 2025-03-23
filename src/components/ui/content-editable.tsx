import { createEffect, createSignal, onMount } from "solid-js";

export default function ContentEditableField(props: {
  initialValue: string;
  onSave: (value: string) => void;
}) {
  const [value, setValue] = createSignal("");
  const [isEditing, setIsEditing] = createSignal(false);
  let contentEditableRef: HTMLDivElement | undefined;

  createEffect(() => {
    setValue(props.initialValue);
  });

  const handleBlur = () => {
    setIsEditing(false);
    props.onSave(value());
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      props.onSave(value());
    }
  };

  onMount(() => {
    if (contentEditableRef) {
      contentEditableRef.textContent = value();
    }
  });

  return (
    <div
      ref={contentEditableRef}
      class="flex min-h-9 w-full rounded-md  hover:bg-accent px-3 py-2  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50"
      contentEditable={isEditing()}
      onInput={(e) => setValue(e.target.textContent || "")}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={() => setIsEditing(true)}
    >
      {value()}
    </div>
  );
}
