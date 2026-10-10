const bats = [
  { side: "left", top: "58%", delay: "0s", size: 28 },
  { side: "left", top: "69%", delay: ".24s", size: 19 },
  { side: "left", top: "78%", delay: ".5s", size: 14 },
  { side: "right", top: "51%", delay: ".12s", size: 25 },
  { side: "right", top: "66%", delay: ".38s", size: 17 },
  { side: "right", top: "76%", delay: ".62s", size: 12 },
] as const;

export function EntranceBats() {
  return <div className="entrance-bats pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
    {bats.map((bat, index) => <svg key={index} className={`entrance-bat entrance-bat-${bat.side} absolute`} style={{ top: bat.top, animationDelay: bat.delay, width: bat.size * 2, height: bat.size }} viewBox="0 0 64 32" fill="currentColor">
      <path d="M32 12c-3-5-5-6-8-7l1 9c-4-3-8-3-11-2-4-4-9-5-14-3 3 5 4 10 5 15 3-2 7-2 10 0 2-4 5-6 10-5 2 4 4 7 7 9 3-2 5-5 7-9 5-1 8 1 10 5 3-2 7-2 10 0 1-5 2-10 5-15-5-2-10-1-14 3-3-1-7-1-11 2l1-9c-3 1-5 2-8 7Z" />
    </svg>)}
  </div>;
}
