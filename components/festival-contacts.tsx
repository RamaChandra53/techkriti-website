import { UserGroupIcon } from "@heroicons/react/24/outline";
import { contactGroups } from "@/lib/content";

export function FestivalContacts({ headingLevel: Heading = "h3", className = "" }: { headingLevel?: "h2" | "h3"; className?: string }) {
  return <section aria-labelledby="festival-contacts-title" className={className}>
    <div className="flex items-center gap-4">
      <UserGroupIcon className="h-8 w-8 shrink-0 text-[#ff8a4c]" aria-hidden="true" />
      <Heading id="festival-contacts-title" className="display-heading text-[clamp(2rem,4vw,3.5rem)] text-[#fff4e9]">Whom to contact</Heading>
    </div>
    <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-2">
      {contactGroups.map((group) => <div key={group.title}>
        <h4 className="text-base font-bold text-[#ffb482]">{group.title}</h4>
        <ul className="mt-2 space-y-2 text-[#fff4e9]">
          {group.people.map((person) => <li key={person.name}>
            <span className="font-medium">{person.name}</span>
            {person.detail && <span className="block text-sm text-[var(--muted)]">{person.detail}</span>}
            {person.phone && <a className="ml-2 whitespace-nowrap text-[#ffb482] underline-offset-4 hover:underline" href={`tel:+91${person.phone}`}>+91 {person.phone}</a>}
          </li>)}
        </ul>
      </div>)}
    </div>
  </section>;
}
