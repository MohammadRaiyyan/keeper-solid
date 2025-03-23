import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import toast from "solid-toast";

import { useNavigate } from "@tanstack/solid-router";
import { Button } from "~/components/ui/button";
import ActionLink from "../../components/common/ActionLink";
import Input from "../../components/common/Form/Input";
import { paths } from "../../constants/routes";
import { useRegister } from "../../hooks/auth";
import type { RegisterPayload } from "../../types/auth";
import FormLayout from "./components/FormLayout";
import { validateAllFields, validateField } from "./helper/validator";

const Footer = () => {
  return (
    <div class="flex items-center gap-1 flex-col justify-center w-full">
      <ActionLink
        title="Already have an account?"
        url={paths.LOGIN}
        actionName="Login"
      />
    </div>
  );
};

type FormStateType = {
  fields: RegisterPayload;
  error: Record<keyof RegisterPayload, string | undefined>;
  touched: boolean;
  submitting: boolean;
};

const Register = () => {
  const navigate = useNavigate();
  const register = useRegister();

  const [formState, setFormState] = createStore<FormStateType>({
    fields: { email: "", password: "", firstName: "", lastName: "" },
    error: {
      email: undefined,
      password: undefined,
      firstName: undefined,
      lastName: undefined,
    },
    touched: false,
    submitting: false,
  });
  const isSubmittable = createMemo(() => {
    if (formState.touched) {
      return validateAllFields(formState.fields);
    }
    return true;
  });

  const handleInput = (value: string, fieldName: keyof RegisterPayload) => {
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

    await register.mutateAsync(formState.fields, {
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
    <FormLayout title="Register to continue" footer={<Footer />}>
      <form class="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="firstName"
          error={formState.error.firstName}
          handleInput={(value) => handleInput(value, "firstName")}
          type="text"
          title="First Name"
          value={formState.fields.firstName}
          placeholder="Walter"
        />
        <Input
          name="lastName"
          error={formState.error.lastName}
          handleInput={(value) => handleInput(value, "lastName")}
          type="text"
          title="Last Name"
          value={formState.fields.lastName}
          placeholder="White"
        />

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
          class="w-full"
        >
          {`Register${formState.submitting ? "ing..." : ""}`}
        </Button>
      </form>
    </FormLayout>
  );
};

export default Register;
