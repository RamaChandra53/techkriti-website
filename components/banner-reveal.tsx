import { Container } from "./container";

export function BannerReveal() {
  return <section id="revelation" aria-labelledby="reveal-title" className="scroll-mt-24 bg-[#110c16]/58">
    <Container>
      <div className="mb-8 sm:mb-10">
        <h2 id="reveal-title" className="display-heading mt-2 text-[clamp(3rem,8vw,6.2rem)]">Witness the<br /><span className="text-[var(--ember)]">reveal</span></h2>
      </div>
      <div className="revelation-video-frame">
        <video className="revelation-inline-video" src="/branding/revelation.mp4" controls playsInline muted preload="auto" aria-label="Techkriti February 2025 banner reveal video">
          Your browser does not support video playback.
        </video>
      </div>
    </Container>
  </section>;
}
