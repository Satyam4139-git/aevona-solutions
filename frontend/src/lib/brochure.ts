export const BROCHURE_URL = '/Aevona_Solutions_Pricing_Brochure_2026.pdf';
export const BROCHURE_FILENAME = 'Aevona_Solutions_Pricing_Brochure_2026.pdf';

/** Starts a file download of the brochure (call from a click handler). */
export const downloadBrochure = () => {
  const a = document.createElement('a');
  a.href = BROCHURE_URL;
  a.download = BROCHURE_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
