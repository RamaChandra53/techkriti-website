export function TransitionTape({ label }: { label: string }) {
  return <div className="transition-tape" role="separator" aria-label={label}>
    <span className="transition-tape-label">{label}</span>
  </div>;
}
