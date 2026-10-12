import { Container } from "./container";

const guests = [
  { name: "Adivi Sesh", href: "https://www.instagram.com/p/DUnyVsCj7ot/?img_index=1" },
  { name: "Sai Dharam Tej", href: "https://www.instagram.com/p/DUktPvZkRVH/" },
];

export function PastGuests() {
  return <section id="past-guests" aria-labelledby="past-guests-title" className="past-guests-section scroll-mt-24">
    <Container>
      <p className="past-guests-kicker">Past guests · Techkriti ’25</p>
      <h2 id="past-guests-title" className="past-guests-title">They walked <span>among us.</span></h2>
      <div className="past-guests-grid">
        {guests.map((guest) => <article key={guest.name} className="past-guest-card">
          <a href={guest.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${guest.name} Instagram post`}>
            <div className="past-guest-portrait" role="img" aria-label={`${guest.name} guest portrait placeholder`}><span className="past-guest-placeholder-icon" aria-hidden="true">▧</span><span>{guest.name}</span></div>
            <h3>{guest.name}</h3>
          </a>
          <p>Actor</p>
        </article>)}
      </div>
    </Container>
  </section>;
}
