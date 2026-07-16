/**
 * Client-side validation for the admin login form.
 * Never submit until this passes.
 */

export type AdminLoginFormValues = {
  email: string;
  password: string;
};

export type AdminLoginFieldErrors = {
  email?: string;
  password?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAdminLoginForm(
  values: AdminLoginFormValues,
): AdminLoginFieldErrors {
  const errors: AdminLoginFieldErrors = {};

  const email = values.email.trim();
  const password = values.password;

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password || password.trim().length === 0) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function hasFieldErrors(errors: AdminLoginFieldErrors): boolean {
  return Boolean(errors.email || errors.password);
}
