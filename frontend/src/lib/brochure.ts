/** Company brochure (PDF). It is opened in the browser, never force-downloaded. */
export const BROCHURE_URL = '/Aevona_Solution_Brochure_Professional.pdf';
export const BROCHURE_TITLE = 'Aevona Solution Brochure';

/** Opens the brochure in a new browser tab (call from a click handler). */
export const openBrochure = () => {
  window.open(BROCHURE_URL, '_blank', 'noopener,noreferrer');
};
