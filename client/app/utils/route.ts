export function sanityRoute(route: string): string {
  return route.replace(/([^\w|-])+/g, '-');
}