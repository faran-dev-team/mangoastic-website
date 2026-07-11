"use client";

import { useCallback, useState } from "react";

export function useComingSoonToast() {
  const [open, setOpen] = useState(false);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const trigger = useCallback(() => {
    setOpen(true);
  }, []);

  return { open, trigger, dismiss };
}
