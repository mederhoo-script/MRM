/**
 * MarqueeStrip — Continuously scrolling text band (Aurore / Smileyque2 style).
 * Pure CSS animation — no client state required.
 */
const ITEMS = [
  "Women's Fashion",
  "Men's Senator Wear",
  "Bridal Couture",
  "Designer Collections",
  "Heritage Wear",
  "Luxury Accessories",
];

const SEPARATOR = "\u00A0\u00A0•\u00A0\u00A0";

const text = ITEMS.join(SEPARATOR);

export default function MarqueeStrip() {
  return (
    <div className="bg-gold text-brand-black overflow-hidden py-3 select-none">
      {/*
        We render two identical copies of the text side-by-side.
        The animation translates the container by -50%, which exactly
        moves from "copy 1" to "copy 2" — creating a seamless loop.
      */}
      <div
        className="flex whitespace-nowrap animate-marquee"
        aria-hidden="true"
      >
        {/* Two copies = seamless infinite loop at translateX(-50%) */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-inter text-xs tracking-[0.35em] uppercase px-8"
          >
            {text}
            {SEPARATOR}
          </span>
        ))}
      </div>
    </div>
  );
}
