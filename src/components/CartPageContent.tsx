"use client";

import EmptyCart from "@/components/empty/EmptyCart";
import TrustMicrocopy from "@/components/conversion/TrustMicrocopy";
import { freeDeliveryMessage, formatPkr } from "@/lib/commerce";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  pricePkr: number;
};

const DEMO_ITEM: CartItem = {
  id: "classic-7kg",
  name: "Mangoastic Classic 7kg",
  pricePkr: 3077,
};

const STORAGE_KEY = "mangoastic_cart_demo";

export default function CartPageContent() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw) as CartItem[]);
      } else {
        setItems([DEMO_ITEM]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([DEMO_ITEM]));
      }
    } catch {
      setItems([DEMO_ITEM]);
    }
    setHydrated(true);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.pricePkr, 0),
    [items],
  );

  const deliveryNote = freeDeliveryMessage(subtotal);

  function clearCart() {
    setItems([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch {
      /* ignore */
    }
  }

  if (!hydrated) {
    return (
      <div className="min-h-[40vh] bg-black" aria-busy="true" aria-label="Loading cart" />
    );
  }

  return (
    <div className="bg-black text-white">
      <section className="px-4 py-12 sm:px-6 sm:py-14 md:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Your cart
          </p>
          <h1 className="mt-3 font-sirelia text-3xl text-white sm:text-4xl">
            Checkout
          </h1>

          {items.length === 0 ? (
            <div className="mt-10">
              <EmptyCart />
            </div>
          ) : (
            <>
              <ul className="mt-8 space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800/90 bg-zinc-950/40 px-5 py-4"
                  >
                    <span className="font-outfit text-sm font-semibold text-white sm:text-base">
                      {item.name}
                    </span>
                    <span className="font-outfit text-sm font-medium text-mango">
                      {formatPkr(item.pricePkr)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-zinc-800/90 bg-zinc-950/40 p-5 sm:p-6">
                <div className="flex items-center justify-between font-outfit text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    {formatPkr(subtotal)}
                  </span>
                </div>

                {deliveryNote ? (
                  <p className="mt-4 font-outfit text-sm font-semibold text-mango">
                    {deliveryNote}
                  </p>
                ) : (
                  <p className="mt-4 font-outfit text-sm font-semibold text-mango">
                    You qualify for free delivery.
                  </p>
                )}

                <Link
                  href="/order/confirmation"
                  className="mt-6 flex w-full items-center justify-center rounded-full bg-mango py-3.5 font-outfit text-sm font-semibold text-black transition hover:bg-mango/90"
                >
                  Continue to checkout
                </Link>

                <p className="mt-4 text-center font-outfit text-xs leading-relaxed text-zinc-500 sm:text-sm">
                  Secure checkout. COD available. Replacement if anything&apos;s
                  wrong.
                </p>

                <TrustMicrocopy className="mt-4 text-center" />

                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-6 w-full font-outfit text-xs text-zinc-600 underline-offset-2 hover:text-zinc-400 hover:underline"
                >
                  Clear cart (demo)
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
