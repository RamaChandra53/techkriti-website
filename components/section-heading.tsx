export function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="max-w-3xl">
    <p className="eyebrow mb-4">{kicker}</p>
    <h2 className="text-balance font-haunt text-5xl leading-[1.05] text-[#fff0dc] sm:text-7xl">{title}</h2>
    {copy && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#c4adbd]">{copy}</p>}
  </div>;
}
