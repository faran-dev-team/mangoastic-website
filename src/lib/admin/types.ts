/**
 * Admin dashboard / orders domain types (frontend).
 * Mirrors backend Phase 6.2–7.2 response contracts + CEO KPIs.
 */

export type DashboardSummary = {
  totalOrders: number;
  newOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  todaysOrders: number;
  pendingOrders: number;
  deliveredToday: number;
  todaysRevenue: number;
  totalRevenue: number;
  averageOrderValue: number;
  activeCustomers: number;
  totalCustomers: number;
};

export type OrdersByStatusSlice = {
  status: string;
  count: number;
};

export type DailyMetricPoint = {
  date: string;
  value: number;
};

export type TopCitySlice = {
  city: string;
  count: number;
};

export type DashboardCharts = {
  ordersByStatus: OrdersByStatusSlice[];
  ordersLast7Days: DailyMetricPoint[];
  revenueLast7Days: DailyMetricPoint[];
  topCities: TopCitySlice[];
};

export type AdminOrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PACKED"
  | "DELIVERED"
  | "CANCELLED";

export type AdminOrderSort =
  | "newest"
  | "oldest"
  | "highest_total"
  | "lowest_total";

export type AdminOrderListItem = {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  city: string;
  mangoName: string;
  quantity: number;
  total: number;
  status: AdminOrderStatus;
  createdAt: string;
};

/** Client-side order discovery query (synced with URL + API). */
export type AdminOrderListQuery = {
  search: string;
  status: AdminOrderStatus | null;
  city: string | null;
  sort: AdminOrderSort;
};

/**
 * Full order inspection payload (Phase 7.1).
 * Mirrors GET /api/admin/orders/:orderId.
 */
export type AdminOrderDetail = {
  orderId: string;
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    city: string;
    address: string;
    landmark: string | null;
    notes: string | null;
  };
  product: {
    mango: string;
    box: string;
    quantity: number;
    ripeness: string;
    addons: string[];
  };
  pricing: {
    total: number;
  };
  status: AdminOrderStatus;
  createdAt: string;
  updatedAt: string;
};

/** PATCH /api/admin/orders/:orderId/status response data. */
export type UpdateAdminOrderStatusResult = {
  orderId: string;
  status: AdminOrderStatus;
};

/** Customer directory — derived from orders by phone. */
export type AdminCustomerListItem = {
  phoneNumber: string;
  name: string;
  city: string;
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderAt: string;
  activeOrderId: string | null;
  activeOrderStatus: AdminOrderStatus | null;
};

export type AdminCustomerOrderSummary = {
  orderId: string;
  mangoName: string;
  quantity: number;
  total: number;
  status: AdminOrderStatus;
  city: string;
  createdAt: string;
};

export type AdminCustomerDetail = {
  phoneNumber: string;
  name: string;
  city: string;
  totalOrders: number;
  lifetimeSpend: number;
  lastOrderAt: string;
  activeOrderId: string | null;
  activeOrderStatus: AdminOrderStatus | null;
  orders: AdminCustomerOrderSummary[];
};

export type ApiErrorDetail = {
  field?: string;
  message: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  requestId?: string;
  timestamp?: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: ApiErrorDetail[];
  requestId?: string;
  timestamp?: string;
};
