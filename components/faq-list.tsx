import type { FAQ } from "@/lib/types";

export function FAQList({ items }: { items: FAQ[] }) {
  return <div className="border-t border-[#564254]">
    {items.map((faq) => <details key={faq.question} className="group border-b border-[#564254]">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-[#fff4e9] sm:text-xl"><span>{faq.question}</span><span aria-hidden="true" className="text-3xl font-light leading-none text-[#ff9a62] transition-transform group-open:rotate-45">+</span></summary>
      <p className="max-w-3xl pb-7 pr-8 text-base leading-relaxed text-[#d4c3d0]">{faq.answer}</p>
    </details>)}
  </div>;
}
