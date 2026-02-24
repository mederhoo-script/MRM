'use client';

/**
 * DesignsSection — client wrapper for the design card grid + quick view modal.
 *
 * Kept as a separate client component so that the parent app/page.tsx can
 * remain a server component (no 'use client' needed there).
 */

import { useState } from 'react';
import DesignCard from '@/components/DesignCard';
import DesignQuickView from '@/components/DesignQuickView';
import type { Design } from '@/lib/content';

interface Props {
  designs: Design[];
}

export default function DesignsSection({ designs }: Props) {
  const [activeDesign, setActiveDesign] = useState<Design | null>(null);

  return (
    <>
      {/* Design grid — 2 cols mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onQuickView={() => setActiveDesign(design)}
          />
        ))}
      </div>

      {/* Quick View modal — rendered at root level via fixed positioning */}
      <DesignQuickView
        design={activeDesign}
        allDesigns={designs}
        onClose={() => setActiveDesign(null)}
        onNavigate={(d) => setActiveDesign(d)}
      />
    </>
  );
}
