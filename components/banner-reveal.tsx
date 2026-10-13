import { Container } from "./container";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export function BannerReveal() {
  return <section id="revelation" aria-labelledby="reveal-title" className="scroll-mt-24 bg-[#110c16]/58">
    <Container>
      <div className="mb-8 sm:mb-10">
        <h2 id="reveal-title" className="display-heading mt-2 text-[clamp(2.5rem,6vw,5rem)]">Witness the<br /><span className="text-[var(--ember)]">reveal</span></h2>
      </div>
      <div className="mb-1 flex justify-end">
        <a href="https://www.instagram.com/p/DeYchejxXHN/?hl=en" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-dashed border-[#a889c6]/80 bg-[#110c16]/90 px-2.5 py-1 text-[11px] font-bold text-[#a889c6] transition hover:border-[#c6a9e3] hover:bg-[#110c16] hover:text-[#c6a9e3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a889c6]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>
          Witness the Madness <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <div className="revelation-video-frame">
        <video className="revelation-inline-video" src="/branding/revelation.mp4" poster="/branding/revelation-poster.png" controls playsInline muted preload="metadata" aria-label="Techkriti 2026 edition reveal video">
          Your browser does not support video playback.
        </video>
      </div>
    </Container>
  </section>;
}
