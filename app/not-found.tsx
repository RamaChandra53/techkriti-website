import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() { return <section className="section-glow grid min-h-[65vh] place-items-center py-20 text-[#fff4e9]"><Container className="text-center"><p className="eyebrow">PAGE NOT FOUND</p><h1 className="display-heading mt-6 text-6xl sm:text-8xl">Wrong turn?</h1><p className="muted-copy mx-auto mt-6 max-w-xl text-xl">That page doesn’t exist, but the festival is still right where you left it.</p><Link href="/" className="button-flame mt-9 inline-block px-6 py-4 font-bold">Return home</Link></Container></section>; }
