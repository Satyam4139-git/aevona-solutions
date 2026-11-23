import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { BROCHURE_URL, BROCHURE_FILENAME } from '../../lib/brochure';

/** Shows the pricing brochure on the page (the footer link also starts the download). */
export const BrochurePage: React.FC = () => (
  <div className="min-h-screen bg-[#f3f6f9] py-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0b4f9c]/40 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0b4f9c]">
            <FileText className="w-3.5 h-3.5" /> Brochure
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#12202f]">
            Aevona Solutions Pricing Brochure 2026
          </h1>
          <p className="mt-2 text-sm text-[#4a5a6a]">Your download should start automatically. You can also read it below.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={BROCHURE_URL}
            download={BROCHURE_FILENAME}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0b4f9c] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#083b75]"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0b4f9c] bg-white px-5 py-3 text-sm font-bold text-[#0b4f9c] transition-all hover:bg-[#0b4f9c]/10"
          >
            <ExternalLink className="w-4 h-4" /> Open in new tab
          </a>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border-2 border-[#0b4f9c]/60 bg-white shadow-[0_20px_60px_-24px_rgba(11,79,156,.5)]">
        <iframe title="Aevona Solutions Pricing Brochure 2026" src={`${BROCHURE_URL}#view=FitH`} className="block w-full h-[80vh] min-h-[520px]" />
      </div>

      <p className="mt-4 text-center text-xs text-[#4a5a6a]">
        PDF not showing on your device? Use <strong>Open in new tab</strong> or <strong>Download PDF</strong> above.
      </p>
    </div>
  </div>
);
