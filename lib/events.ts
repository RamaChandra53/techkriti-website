import type { Event } from "./types";

export interface EventFilters { q?: string; division?: string; category?: string; day?: string }

export function filterEvents(items: Event[], filters: EventFilters): Event[] {
  const query = filters.q?.trim().toLowerCase() ?? "";
  return items.filter((event) => {
    const searchable = `${event.title} ${event.summary} ${event.category} ${event.venue} ${event.division}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesDivision = !filters.division || event.division.toLowerCase() === filters.division.toLowerCase();
    const matchesEventCategory = !filters.category || event.category.toLowerCase() === filters.category.toLowerCase();
    const matchesDay = !filters.day || String(event.day) === filters.day;
    return matchesQuery && matchesDivision && matchesEventCategory && matchesDay;
  });
}
