import { contactGroups } from "@/lib/content";
import { TransitionTape } from "./transition-tape";

export function FestivalContacts({ headingLevel: Heading = "h3", className = "" }: { headingLevel?: "h2" | "h3"; className?: string }) {
  return <section aria-labelledby="festival-contacts-title" className={className}>
    <TransitionTape label="REACH THE ORGANIZERS" />
    <div className="mt-6">
      <Heading id="festival-contacts-title" className="display-heading whitespace-nowrap text-[clamp(2.2rem,5vw,4rem)] text-[#fff4e9]">Whom to <span className="text-[#ff7938]">contact</span></Heading>
    </div>
    <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-10">
      {contactGroups.map((group, index) => <div key={group.title} className="col-span-2 text-center">
        <h4 className="whitespace-nowrap text-[clamp(.98rem,3.3vw,1.3rem)] font-bold tracking-[-.02em] text-[#ff7938]">{group.title}</h4>
        <ul className={`mt-2 text-sm text-[#fff4e9] sm:text-base ${index === 0 ? "space-y-2" : "grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-10"}`}>
          {group.people.map((person) => <li key={person.name}>
            <span className="font-medium">{person.name}</span>
            {person.detail && <span className="block text-sm text-[var(--muted)]">{person.detail}</span>}
            {person.phone && <a className="mt-1 block whitespace-nowrap text-[var(--muted)] underline-offset-4 hover:underline" href={`tel:+91${person.phone}`}>+91 {person.phone}</a>}
          </li>)}
        </ul>
      </div>)}
    </div>
  </section>;
}
