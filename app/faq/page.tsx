import type { Metadata } from "next";
import { Container } from "@/components/container";
import { FAQList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/lib/content";

export const metadata: Metadata = { title: "FAQs", description: "Answers to common festival questions." };
export default function FAQPage() { return <><PageHero eyebrow="GOOD TO KNOW" title="Questions, answered." copy="Practical information about attending, participating and staying updated. We will add answers as details are confirmed." /><Container className="max-w-5xl py-16 sm:py-24"><FAQList items={faqs} /></Container></>; }
