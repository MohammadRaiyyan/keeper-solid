import type {
  LoginPayload,
  RegisterPayload,
  fieldName,
} from "../../../types/auth";

const validatePassword = (password: string) => {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  if (!hasUppercase) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!hasLowercase) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!hasDigit) {
    return "Password must contain at least one digit.";
  }

  if (!hasSpecialChar) {
    return "Password must contain at least one special character (!@#$%^&*).";
  }

  return undefined;
};
export const validateField = (fieldName: fieldName, value: string | undefined) => {
  const validatorMap: Record<
    Partial<fieldName>,
    (value: string) => string | undefined
  > = {
    email: (value: string) => {
      const rules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) return String("Email is required!");
      if (rules.test(value)) {
        return undefined;
      }
      return String("Please enter a valid email");
    },
    password: (value: string) => validatePassword(value),
    firstName: (value: string) => {
      if (!value.trim()) return String("First name is required!");
      if (value.length < 3)
        return String("First name should be more than of 4 characters");
      if (value.length > 40)
        return String("First name can not be more than of 40 characters");
      return undefined;
    },
    lastName: (value: string) => {
      if (!value.trim()) return String("Last name is required!");
      if (value.length < 3)
        return String("Last name should be more than of 4 characters");
      if (value.length > 40)
        return String("Last name can not be more than of 40 characters");
      return undefined;
    },
  };
  if (value) {
    return validatorMap[fieldName](value);
  }
  return undefined
};

export const validateAllFields = (
  fields: Partial<LoginPayload & RegisterPayload>,
) => {
  return Object.keys(fields).every((field) => {
    const name = field as (keyof LoginPayload | keyof RegisterPayload);
    const hasMessage = validateField(name, fields[name]);
    return !hasMessage;
  });
};
