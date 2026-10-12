import { Container } from "./container";

export function BannerReveal() {
  return <section id="revelation" aria-labelledby="reveal-title" className="scroll-mt-24 bg-[#110c16]/58 pb-4 pt-2 sm:pb-6 sm:pt-4">
    <Container>
      <div className="mb-4">
        <p className="eyebrow">February 2025 · Previous edition</p>
        <h2 id="reveal-title" className="display-heading mt-2 whitespace-nowrap text-[clamp(2rem,6vw,5rem)]">Witness the <span className="text-[var(--ember)]">reveal</span></h2>
      </div>
      <div className="revelation-video-frame">
        <video className="revelation-inline-video" src="/branding/revelation.mp4" controls playsInline muted preload="auto" aria-label="Techkriti February 2025 banner reveal video">
          Your browser does not support video playback.
        </video>
      </div>
    </Container>
  </section>;
}
