import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import toast from "solid-toast";

import { useNavigate } from "@tanstack/solid-router";
import { Button } from "~/components/ui/button";
import ActionLink from "../../components/common/ActionLink";
import Input from "../../components/common/Form/Input";
import { paths } from "../../constants/routes";
import { useLogin } from "../../hooks/auth";
import type { LoginPayload } from "../../types/auth";
import FormLayout from "./components/FormLayout";
import { validateAllFields, validateField } from "./helper/validator";

const Footer = () => {
  return (
    <div class="flex items-center gap-1 flex-col justify-center w-full">
      <ActionLink
        actionName="Reset"
        title="Forgot Password?"
        url={paths.RESET_PASSWORD}
      />
      <ActionLink
        actionName="Register"
        title="Don't have an account?"
        url={paths.REGISTER}
      />
    </div>
  );
};

type FormStateType = {
  fields: LoginPayload;
  error: Record<keyof LoginPayload, string | undefined>;
  touched: boolean;
  submitting: boolean;
};

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const [formState, setFormState] = createStore<FormStateType>({
    fields: { email: "", password: "" },
    error: { email: undefined, password: undefined },
    touched: false,
    submitting: false,
  });

  const isSubmittable = createMemo(() => {
    if (formState.touched) {
      return validateAllFields(formState.fields);
    }
    return true;
  });

  const handleInput = (value: string, fieldName: keyof LoginPayload) => {
    const error = validateField(fieldName, value);
    setFormState("fields", [fieldName], value);
    setFormState("error", [fieldName], error);
    if (!formState.touched) {
      setFormState("touched", true);
    }
  };
  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const isValid = validateAllFields(formState.fields);
    if (!isValid) {
      toast.error("Please enter credentials to continue");
      return;
    }
    setFormState("submitting", true);

    await login.mutateAsync(formState.fields, {
      onError: (error) => {
        toast.error(error.message);
        setFormState("submitting", false);
      },
      onSuccess: async (data) => {
        toast.success(data.message);
        navigate({ to: "/home" });
        setFormState("submitting", false);
      },
    });
  };

  return (
    <FormLayout title="Login to continue" footer={<Footer />}>
      <form onSubmit={handleSubmit} class="space-y-4">
        <Input
          name="email"
          error={formState.error.email}
          handleInput={(value) => handleInput(value, "email")}
          type="email"
          title="Email"
          value={formState.fields.email}
          placeholder="e.g. work@example.com"
        />
        <Input
          name="password"
          error={formState.error.password}
          handleInput={(value) => handleInput(value, "password")}
          type="password"
          title="Password"
          value={formState.fields.password}
          placeholder="............"
        />
        <Button
          disabled={!isSubmittable() || formState.submitting}
          type="submit"
          variant="default"
          class="w-full"
        >
          {`Login${formState.submitting ? "g..." : ""}`}
        </Button>
      </form>
    </FormLayout>
  );
};

export default Login;
