/*
 * Hash routes work on any static host or CDN without rewrite rules, which is
 * what lets the whole frontend be served from the edge.
 */
export type Route =
  | { name: "dashboard" }
  | { name: "page"; slug: string }
  | { name: "review"; topic: string };

export const ALL_TOPICS = "all";

export function parseRoute(hash: string): Route {
  const [head = "", tail = ""] = hash.replace(/^#\/?/, "").split(/\/(.*)/s);
  if (head === "page" && tail) return { name: "page", slug: decodeURIComponent(tail) };
  if (head === "review") return { name: "review", topic: tail ? decodeURIComponent(tail) : ALL_TOPICS };
  return { name: "dashboard" };
}

export function routeHref(route: Route): string {
  if (route.name === "page") return `#/page/${encodeURIComponent(route.slug)}`;
  if (route.name === "review") return route.topic === ALL_TOPICS ? "#/review" : `#/review/${encodeURIComponent(route.topic)}`;
  return "#/";
}

export function navigate(route: Route): void {
  window.location.hash = routeHref(route);
}
