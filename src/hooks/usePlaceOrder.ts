"use client";

import { useCallback, useRef, useState } from "react";
import { whatsappLink } from "@/data/contact";
import {
  createOrder,
  OrderApiError,
  type CreateOrderPayload,
} from "@/lib/orders";
import {
  buildOrderWhatsAppMessage,
  type WhatsAppOrderMessageInput,
} from "@/lib/whatsappOrderMessage";

export type PlaceOrderStatus = "idle" | "submitting" | "success" | "error";

export type PlaceOrderResult = {
  orderId: string;
  totalPrice: number;
};

type UsePlaceOrderOptions = {
  /** Brief pause after success so the user sees confirmation before redirect. */
  successPauseMs?: number;
};

/**
 * Handles create-order → success confirmation → WhatsApp redirect.
 * Prevents duplicate submissions while a request is in flight.
 */
export function usePlaceOrder(options: UsePlaceOrderOptions = {}) {
  const successPauseMs = options.successPauseMs ?? 900;
  const [status, setStatus] = useState<PlaceOrderStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const inFlightRef = useRef(false);

  const resetError = useCallback(() => {
    setErrorMessage(null);
    setFieldErrors({});
  }, []);

  const placeOrder = useCallback(
    async (
      payload: CreateOrderPayload,
      messageInput: Omit<WhatsAppOrderMessageInput, "orderId" | "totalPrice"> & {
        totalPrice: number;
      },
    ): Promise<PlaceOrderResult | null> => {
      if (inFlightRef.current) {
        return null;
      }

      inFlightRef.current = true;
      setStatus("submitting");
      setErrorMessage(null);
      setFieldErrors({});

      try {
        const result = await createOrder(payload);
        const totalPrice =
          typeof result.totalPrice === "number"
            ? result.totalPrice
            : messageInput.totalPrice;

        setStatus("success");

        const message = buildOrderWhatsAppMessage({
          ...messageInput,
          orderId: result.orderId,
          totalPrice,
        });

        await wait(successPauseMs);

        const href = whatsappLink(message);
        window.location.assign(href);

        return { orderId: result.orderId, totalPrice };
      } catch (error) {
        setStatus("error");

        if (error instanceof OrderApiError) {
          setErrorMessage(error.message);
          const mapped: Record<string, string> = {};
          for (const detail of error.errors) {
            if (detail.field && detail.message) {
              mapped[detail.field] = detail.message;
            }
          }
          setFieldErrors(mapped);
        } else {
          setErrorMessage(
            "Something went wrong while placing your order. Please try again.",
          );
        }

        return null;
      } finally {
        inFlightRef.current = false;
        setStatus((current) =>
          current === "submitting" ? "idle" : current,
        );
      }
    },
    [successPauseMs],
  );

  return {
    status,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    errorMessage,
    fieldErrors,
    placeOrder,
    resetError,
  };
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
