import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";

export function SiteHeader() {
  return <header className="sticky top-0 z-50 border-b border-[#493547] bg-[#0d0a12]/95 text-[#fff4e9] backdrop-blur-lg">
    <Container className="flex min-h-[60px] items-center justify-between gap-3 sm:min-h-[68px]">
      <Logo />
      <Link href="/#discover" className="register-button inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm font-black uppercase tracking-[.12em] sm:min-h-11 sm:px-6">Register</Link>
    </Container>
  </header>;
}
