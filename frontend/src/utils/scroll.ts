/**
 * Smoothly scrolls the page to the element with the given id.
 * Use this instead of href="#id" hash links to avoid polluting the URL bar.
 */
export function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
