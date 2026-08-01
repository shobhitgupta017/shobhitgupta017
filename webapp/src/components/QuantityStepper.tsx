"use client";

export function QuantityStepper({
  quantity,
  onChange,
  size = "md",
  label = "quantity",
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
  label?: string;
}) {
  const button =
    size === "sm"
      ? "h-8 w-8 text-base"
      : "h-10 w-10 text-lg";

  return (
    <div className="inline-flex items-center rounded-full border border-ink/10 bg-white">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(quantity - 1)}
        className={`${button} grid place-items-center rounded-full text-ink transition hover:bg-brand-50`}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">{quantity}</span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(quantity + 1)}
        className={`${button} grid place-items-center rounded-full text-ink transition hover:bg-brand-50`}
      >
        +
      </button>
    </div>
  );
}
