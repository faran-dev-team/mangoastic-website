import React from 'react';

const rows = [
  ['Single orchard', 'Yes', 'No', 'No'],
  ['Picked within 24h', 'Yes', 'Sometimes', 'Rarely'],
  ['Rejection rate at source', '~40%', '~5%', '~10%'],
  ['Branded gift packaging', 'Yes', 'No', 'Basic'],
  ['Ripeness card per box', 'Yes', 'No', 'No'],
  ['Replacement guarantee', 'Yes', 'No', 'Limited'],
  ['Customer support response', 'Under 8 min', '—', 'Hours–days'],
];

function CellIcon({ value }: { value: string }) {
  if (value === 'Yes' || value.startsWith('~') || value.includes('Under')) {
    return (
      <span className="inline-flex items-center gap-2 text-amber-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm text-zinc-300">{value}</span>
      </span>
    );
  }
  if (value === 'No') {
    return <span className="text-sm text-zinc-500">No</span>;
  }
  return <span className="text-sm text-zinc-400">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h3 className="font-display text-2xl font-light text-white">How we compare</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400">
            A quick comparison between Mangoastic, typical mandi boxes, and generic online sellers.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-zinc-950">
                <th className="w-1/3 px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">Comparison</th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">Mangoastic</th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">Mandi Box</th>
                <th className="w-1/6 px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-400">Online Seller</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-zinc-800 last:border-b-0">
                  <td className="px-4 py-4 align-top text-sm text-zinc-300">{r[0]}</td>
                  <td className="px-4 py-4 align-top"> <CellIcon value={r[1]} /> </td>
                  <td className="px-4 py-4 align-top"> <CellIcon value={r[2]} /> </td>
                  <td className="px-4 py-4 align-top"> <CellIcon value={r[3]} /> </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
