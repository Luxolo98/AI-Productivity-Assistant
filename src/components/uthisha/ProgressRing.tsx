interface ProgressRingProps {
  done: number;
  total: number;
  size?: number;
}

export function ProgressRing({ done, total, size = 132 }: ProgressRingProps) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const stroke = size / 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className="stroke-gold transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-2xl font-bold leading-none">{pct}%</div>
          <div className="mt-1 text-[11px] font-medium text-muted-foreground">
            {done} of {total} done
          </div>
        </div>
      </div>
    </div>
  );
}
