"use client";

import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function SampleHero() {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="w-full bg-white dark:bg-black py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-semibold mb-4">The mango. Untouched.</h2>
        <p className="text-lg text-zinc-600 mb-6">
          Pakistan's most loved fruit, delivered from our orchard to your door.
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="btn btn-primary btn-mango"
            onClick={() =>
              alert("DaisyUI Order CTA — replace with cart/WhatsApp flow")
            }
          >
            Order This Season's Box
          </button>

          <Button variant="contained" onClick={() => setOpen(true)}>
            Quick Quote (MUI)
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Quick Quote</DialogTitle>
        <DialogContent>
          <p>
            Send us a WhatsApp message for a corporate quote or custom
            packaging.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
