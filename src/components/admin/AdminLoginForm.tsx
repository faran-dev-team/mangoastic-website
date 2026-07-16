"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthApiError } from "@/lib/auth/api";
import {
  hasFieldErrors,
  validateAdminLoginForm,
  type AdminLoginFieldErrors,
} from "@/lib/auth/validation";
import { useAuth } from "@/hooks/useAuth";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-4 py-3 font-outfit text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-mango/50 focus:ring-1 focus:ring-mango/30 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass =
  "block font-outfit text-xs font-medium uppercase tracking-[0.1em] text-zinc-400";

/**
 * Admin login form — validates locally, posts to the backend, then redirects.
 */
export default function AdminLoginForm() {
  const router = useRouter();
  const { login, status, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<AdminLoginFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [status, isAuthenticated, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inFlightRef.current) {
      return;
    }

    const errors = validateAdminLoginForm({ email, password });
    setFieldErrors(errors);
    setFormError(null);

    if (hasFieldErrors(errors)) {
      return;
    }

    inFlightRef.current = true;
    setIsSubmitting(true);

    try {
      await login({
        email: email.trim().toLowerCase(),
        password,
      });
      router.replace("/admin/dashboard");
    } catch (error) {
      if (error instanceof AuthApiError) {
        const mapped: AdminLoginFieldErrors = {};
        for (const detail of error.errors) {
          if (detail.field === "email" || detail.field === "password") {
            mapped[detail.field] = detail.message;
          }
        }
        setFieldErrors(mapped);
        setFormError(error.message);
      } else {
        setFormError("Unable to sign in right now. Please try again.");
      }
    } finally {
      inFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div
        className="flex flex-col items-center gap-3 py-10"
        role="status"
        aria-live="polite"
      >
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-mango/30 border-t-mango"
          aria-hidden
        />
        <p className="font-outfit text-sm text-zinc-400">Loading…</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-10"
        role="status"
        aria-live="polite"
      >
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-mango/30 border-t-mango"
          aria-hidden
        />
        <p className="font-outfit text-sm text-zinc-400">
          Redirecting to dashboard…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {formError ? (
        <div
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-outfit text-sm text-red-300"
        >
          {formError}
        </div>
      ) : null}

      <div>
        <label htmlFor="admin-email" className={labelClass}>
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          value={email}
          disabled={isSubmitting}
          onChange={(event) => {
            setEmail(event.target.value);
            if (fieldErrors.email) {
              setFieldErrors((current) => ({ ...current, email: undefined }));
            }
          }}
          className={inputClass}
          placeholder="admin@example.com"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "admin-email-error" : undefined}
        />
        {fieldErrors.email ? (
          <p
            id="admin-email-error"
            className="mt-1.5 font-outfit text-xs text-red-400"
          >
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="admin-password" className={labelClass}>
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            disabled={isSubmitting}
            onChange={(event) => {
              setPassword(event.target.value);
              if (fieldErrors.password) {
                setFieldErrors((current) => ({
                  ...current,
                  password: undefined,
                }));
              }
            }}
            className={`${inputClass} mt-0 pr-12`}
            placeholder="••••••••"
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password ? "admin-password-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            disabled={isSubmitting}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500 transition hover:text-zinc-300 disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
        {fieldErrors.password ? (
          <p
            id="admin-password-error"
            className="mt-1.5 font-outfit text-xs text-red-400"
          >
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mango px-5 py-3 font-outfit text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
