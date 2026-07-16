import {
  ORDERS_ENDPOINT,
  ORDER_REQUEST_TIMEOUT_MS,
  assertApiConfigured,
} from "@/lib/config";

export type CreateOrderPayload = {
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  landmark?: string;
  notes?: string;
  mangoName: string;
  boxSize: string;
  quantity: number;
  ripeness: string;
  addons: string[];
};

export type CreateOrderSuccessData = {
  orderId: string;
  status: string;
  totalPrice?: number;
};

export type ApiErrorDetail = {
  field?: string;
  message: string;
};

export type CreateOrderSuccessResponse = {
  success: true;
  message: string;
  data: CreateOrderSuccessData;
  requestId?: string;
  timestamp?: string;
};

export type CreateOrderErrorResponse = {
  success: false;
  message: string;
  errors?: ApiErrorDetail[];
  requestId?: string;
  timestamp?: string;
};

export class OrderApiError extends Error {
  readonly statusCode: number;
  readonly errors: ApiErrorDetail[];

  constructor(message: string, statusCode: number, errors: ApiErrorDetail[] = []) {
    super(message);
    this.name = "OrderApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * POST /api/orders — create a customer order on the Mangostic backend.
 */
export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderSuccessData> {
  assertApiConfigured();

  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    ORDER_REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(ORDERS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let body: CreateOrderSuccessResponse | CreateOrderErrorResponse | null =
      null;

    try {
      body = (await response.json()) as
        | CreateOrderSuccessResponse
        | CreateOrderErrorResponse;
    } catch {
      body = null;
    }

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new OrderApiError(
        errorBody?.message ||
          "We could not place your order. Please try again.",
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    if (!body.data?.orderId) {
      throw new OrderApiError(
        "Order was created but no order ID was returned.",
        500,
      );
    }

    return body.data;
  } catch (error) {
    if (error instanceof OrderApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new OrderApiError(
        "The request timed out. Please check your connection and try again.",
        408,
      );
    }

    throw new OrderApiError(
      "Unable to reach the server. Please check your connection and try again.",
      0,
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}
