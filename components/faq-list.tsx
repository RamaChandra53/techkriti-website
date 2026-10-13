import type { FAQ } from "@/lib/types";

export function FAQList({ items }: { items: FAQ[] }) {
  return <div className="border-t border-[#564254]">
    {items.map((faq) => <details key={faq.question} className="group border-b border-[#564254]">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-normal leading-tight text-[#fff4e9] sm:text-lg"><span>{faq.question}</span><span aria-hidden="true" className="text-3xl font-light leading-none text-[#ff9a62] transition-transform group-open:rotate-45">+</span></summary>
      <p className="max-w-3xl pb-6 pr-8 text-sm leading-relaxed sm:text-base text-[#d4c3d0]">{faq.answer}</p>
    </details>)}
  </div>;
}
