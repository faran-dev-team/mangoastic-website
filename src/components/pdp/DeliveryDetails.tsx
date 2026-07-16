"use client";

import type { ReactNode } from "react";

export type DeliveryDetailsValue = {
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  landmark: string;
  notes: string;
};

type DeliveryDetailsProps = {
  value: DeliveryDetailsValue;
  onChange: (value: DeliveryDetailsValue) => void;
  fieldErrors?: Record<string, string>;
  disabled?: boolean;
};

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-outfit text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500";

/**
 * Customer delivery fields for the PDP order flow.
 * Styled to match existing ProductSelectors chrome — not a redesign.
 */
export function DeliveryDetails({
  value,
  onChange,
  fieldErrors = {},
  disabled = false,
}: DeliveryDetailsProps) {
  const update = (patch: Partial<DeliveryDetailsValue>) => {
    onChange({ ...value, ...patch });
  };

  return (
    <div className="mt-7 space-y-4 border-t border-zinc-200 pt-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Delivery details
        </p>
        <p className="mt-1 font-outfit text-sm text-zinc-500">
          We&apos;ll confirm your order on WhatsApp after it&apos;s saved.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          error={fieldErrors.customerName}
          required
        >
          <input
            type="text"
            name="customerName"
            autoComplete="name"
            disabled={disabled}
            value={value.customerName}
            onChange={(e) => update({ customerName: e.target.value })}
            placeholder="Ali Khan"
            className={fieldClassName}
          />
        </Field>

        <Field
          label="Phone / WhatsApp"
          error={fieldErrors.phoneNumber}
          required
        >
          <input
            type="tel"
            name="phoneNumber"
            autoComplete="tel"
            disabled={disabled}
            value={value.phoneNumber}
            onChange={(e) => update({ phoneNumber: e.target.value })}
            placeholder="03001234567"
            className={fieldClassName}
          />
        </Field>
      </div>

      <Field label="City" error={fieldErrors.city} required>
        <input
          type="text"
          name="city"
          autoComplete="address-level2"
          disabled={disabled}
          value={value.city}
          onChange={(e) => update({ city: e.target.value })}
          placeholder="Lahore"
          className={fieldClassName}
        />
      </Field>

      <Field label="Address" error={fieldErrors.address} required>
        <textarea
          name="address"
          rows={3}
          disabled={disabled}
          value={value.address}
          onChange={(e) => update({ address: e.target.value })}
          placeholder="Street, area, house / flat number"
          className={`${fieldClassName} resize-y`}
        />
      </Field>

      <Field label="Landmark (optional)" error={fieldErrors.landmark}>
        <input
          type="text"
          name="landmark"
          disabled={disabled}
          value={value.landmark}
          onChange={(e) => update({ landmark: e.target.value })}
          placeholder="Near Liberty Market"
          className={fieldClassName}
        />
      </Field>

      <Field label="Notes (optional)" error={fieldErrors.notes}>
        <textarea
          name="notes"
          rows={2}
          disabled={disabled}
          value={value.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="Gate code, delivery preference…"
          className={`${fieldClassName} resize-y`}
        />
      </Field>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {label}
        {required ? <span className="text-amber-700"> *</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block font-outfit text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
