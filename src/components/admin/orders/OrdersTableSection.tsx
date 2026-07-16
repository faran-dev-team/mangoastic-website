"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import { AdminSectionErrorBoundary } from "@/components/admin/AdminSectionErrorBoundary";
import FilterPanel from "@/components/admin/orders/FilterPanel";
import OrderDetailsDrawer from "@/components/admin/orders/OrderDetailsDrawer";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrdersMetricsStrip from "@/components/admin/orders/OrdersMetricsStrip";
import PageSection from "@/components/admin/dashboard/PageSection";
import { useAdminOrderCities } from "@/hooks/useAdminOrderCities";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { useDeleteOrderActions } from "@/hooks/useDeleteOrderActions";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import { useOrderQueryState } from "@/hooks/useOrderQueryState";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import type { AdminOrderStatus } from "@/lib/admin/types";

/**
 * Live orders discovery section — metrics, sticky filters, table, and actions.
 * Isolated client island; URL state is shareable and refresh-safe.
 */
function OrdersTableSectionComponent() {
  const {
    query,
    hasActiveFilters,
    setSearch,
    setStatus,
    setCity,
    setSort,
    clearFilters,
  } = useOrderQueryState();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const drawerOpen = selectedOrderId != null;
  const selectedOrderIdRef = useRef<string | null>(null);
  selectedOrderIdRef.current = selectedOrderId;
  const detailStatusPatchRef = useRef<
    ((status: AdminOrderStatus) => void) | null
  >(null);

  const apiQuery = useMemo(
    () => ({
      search: query.search,
      status: query.status,
      city: query.city,
      sort: query.sort,
    }),
    [query.search, query.status, query.city, query.sort],
  );

  const {
    data,
    error,
    isLoading,
    isRefreshing,
    isError,
    refetch,
    patchOrderStatus,
    removeOrder,
    restoreOrder,
    getOrderSnapshot,
  } = useAdminOrders(apiQuery);
  const { cities, isLoading: citiesLoading } = useAdminOrderCities();
  const {
    data: summary,
    isLoading: summaryLoading,
  } = useDashboardSummary();

  const statusHandlers = useMemo(
    () => ({
      getOrderSnapshot,
      onOptimistic: (
        orderId: string,
        _from: AdminOrderStatus,
        to: AdminOrderStatus,
      ) => {
        patchOrderStatus(orderId, to);
        if (selectedOrderIdRef.current === orderId) {
          detailStatusPatchRef.current?.(to);
        }
      },
      onRollback: (
        orderId: string,
        from: AdminOrderStatus,
        _to: AdminOrderStatus,
        snapshot: Parameters<typeof restoreOrder>[0] | null,
      ) => {
        if (snapshot) {
          restoreOrder(snapshot);
        } else {
          patchOrderStatus(orderId, from);
        }
        if (selectedOrderIdRef.current === orderId) {
          detailStatusPatchRef.current?.(from);
        }
      },
    }),
    [getOrderSnapshot, patchOrderStatus, restoreOrder],
  );

  const { updatingOrderId, requestStatusChange } =
    useUpdateOrderStatus(statusHandlers);

  const deleteHandlers = useMemo(
    () => ({
      getSnapshot: getOrderSnapshot,
      onRemoved: (orderId: string) => {
        removeOrder(orderId);
        if (selectedOrderIdRef.current === orderId) {
          setSelectedOrderId(null);
          detailStatusPatchRef.current = null;
        }
      },
      onRestoredLocal: restoreOrder,
    }),
    [getOrderSnapshot, removeOrder, restoreOrder],
  );

  const { busyOrderId, deleteOrder } = useDeleteOrderActions(deleteHandlers);

  const handleOrderSelect = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setSelectedOrderId(null);
    detailStatusPatchRef.current = null;
  }, []);

  const handleProvideStatusPatch = useCallback(
    (patch: ((status: AdminOrderStatus) => void) | null) => {
      detailStatusPatchRef.current = patch;
    },
    [],
  );

  const rowBusyId = updatingOrderId ?? busyOrderId;

  return (
    <AdminSectionErrorBoundary
      title="Unable to display orders"
      description="The orders table could not be displayed. You can retry without leaving the page."
    >
      <div className="mb-6">
        <OrdersMetricsStrip
          summary={summary}
          loading={summaryLoading}
        />
      </div>

      <PageSection
        id="orders-table"
        title="All orders"
        description="Action-based workflow — confirm, pack, deliver. Select any row for full details."
        actions={
          isError && !isLoading ? (
            <button
              type="button"
              onClick={refetch}
              className="admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3.5 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
            >
              Retry
            </button>
          ) : null
        }
      >
        <div className="space-y-4">
          <FilterPanel
            query={query}
            cities={cities}
            citiesLoading={citiesLoading}
            searching={isRefreshing}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onCityChange={setCity}
            onSortChange={setSort}
            onClearFilters={clearFilters}
          />

          <OrderTable
            orders={data}
            loading={isLoading}
            refreshing={isRefreshing}
            error={isError ? error : null}
            onRetry={refetch}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onOrderSelect={handleOrderSelect}
            selectedOrderId={selectedOrderId}
            onRequestStatusChange={requestStatusChange}
            updatingOrderId={rowBusyId}
            onDeleteOrder={deleteOrder}
          />
        </div>
      </PageSection>

      <OrderDetailsDrawer
        orderId={selectedOrderId}
        open={drawerOpen}
        onClose={handleDrawerClose}
        onRequestStatusChange={requestStatusChange}
        onDeleteOrder={deleteOrder}
        updatingOrderId={rowBusyId}
        onProvideStatusPatch={handleProvideStatusPatch}
      />
    </AdminSectionErrorBoundary>
  );
}

const OrdersTableSection = memo(OrdersTableSectionComponent);
OrdersTableSection.displayName = "OrdersTableSection";

export default OrdersTableSection;
