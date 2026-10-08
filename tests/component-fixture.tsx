import { createRoot } from "react-dom/client";
import { EventCarousel } from "../components/event-carousel";
import { EventDetailView } from "../components/event-detail-view";
import { fixtureEvents } from "./fixtures";

const view = new URLSearchParams(window.location.search).get("view");
const root = createRoot(document.getElementById("fixture")!);
root.render(<main id="main">{view === "detail" ? <EventDetailView event={fixtureEvents[0]} /> : view === "missing-form" ? <EventDetailView event={fixtureEvents[1]} /> : <><h1>Event component test</h1><EventCarousel events={fixtureEvents} /></>}</main>);
