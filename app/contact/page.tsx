import type { Metadata } from "next";
import { ArrowUpRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = { title: "Contact", description: "Find the Techkriti festival team and MGIT campus information." };

export default function ContactPage() {
  const cards = [
    { icon: MapPinIcon, label: "The campus", value: `${siteConfig.institution}, ${siteConfig.city}` },
    ...(siteConfig.email ? [{ icon: EnvelopeIcon, label: "Email the team", value: siteConfig.email, href: `mailto:${siteConfig.email}` }] : []),
    ...(siteConfig.phone ? [{ icon: PhoneIcon, label: "Call the team", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` }] : [])
  ];
  return <>
    <PageHero eyebrow="MGIT · HYDERABAD" title="Find your way in." copy="Techkriti takes place at Mahatma Gandhi Institute of Technology on 16–17 October 2026. Exact event rooms and team contact details will be added when confirmed." />
    <Container className="py-16 sm:py-24">
      <div className="grid gap-px border border-[#564254] bg-[#564254] md:grid-cols-3">
        {cards.map(({ icon: Icon, label, value, href }) => {
          const content = <><Icon className="h-8 w-8 text-[#ff9a62]" /><p className="eyebrow mt-10">{label}</p><p className="mt-3 break-words text-lg font-bold text-[#fff4e9]">{value}</p>{href && <ArrowUpRightIcon className="mt-5 h-5 w-5 text-[#ffae7a]" />}</>;
          return href ? <a key={label} href={href} className="bg-[#1b1420] p-7 hover:bg-[#29202f]">{content}</a> : <div key={label} className="bg-[#1b1420] p-7">{content}</div>;
        })}
      </div>
      <div className="mt-20 grid gap-10 border-t border-[#564254] pt-10 md:grid-cols-2">
        <section><h2 className="text-2xl font-black tracking-[-.04em]">Rooms and access</h2><p className="muted-copy mt-4 max-w-lg">Specific MGIT building and room numbers are still being assigned. They will be published on each confirmed event page and in the schedule.</p></section>
        <section><h2 className="text-2xl font-black tracking-[-.04em]">Follow the updates</h2><p className="muted-copy mt-4 max-w-lg">The official Instagram page will be linked here when its URL is supplied by the organizers.</p>{siteConfig.social.instagram && <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-link mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-[#ffb386]">Instagram <ArrowUpRightIcon className="h-5 w-5" /><span className="sr-only">(opens in a new tab)</span></a>}</section>
      </div>
    </Container>
  </>;
}
