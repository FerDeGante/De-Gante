import { acta } from "@/content/acta";
import styles from "@/app/(acta)/acta/acta.module.css";

export function FloatingWhatsApp() {
  return (
    <a
      className={styles.floatingWhatsapp}
      href={acta.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="flotante"
      aria-label={acta.floatingCta.accessibleLabel}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.889-5.338 11.892-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span>{acta.floatingCta.label}</span>
    </a>
  );
}

export function HeroHeadline() {
  const segments: { text: string; highlight?: number }[] = [];
  let cursor = 0;
  acta.hero.highlights.forEach((phrase, index) => {
    const start = acta.hero.headline.indexOf(phrase, cursor);
    if (start < 0) return;
    segments.push({ text: acta.hero.headline.slice(cursor, start) });
    segments.push({ text: phrase, highlight: index });
    cursor = start + phrase.length;
  });
  segments.push({ text: acta.hero.headline.slice(cursor) });

  return (
    <h1 id="acta-hero">
      {segments.map((segment, index) =>
        segment.highlight === undefined ? (
          segment.text
        ) : (
          <span
            key={index}
            data-hero-highlight
            className={`${styles.heroHighlight} ${segment.highlight === 0 ? styles.highlightMoney : styles.highlightFine}`}
          >
            {segment.text}
          </span>
        ),
      )}
    </h1>
  );
}

export function ActaCta({ section }: { section: string }) {
  return (
    <a
      className={styles.cta}
      href={acta.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={section}
    >
      {acta.cta.label}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </a>
  );
}

export function SectionIndex({
  number,
  label,
}: {
  number: number;
  label?: string;
}) {
  return (
    <p className={styles.sectionIndex}>
      <span>{String(number).padStart(2, "0")}</span>
      {label ?? acta.brand.method}
    </p>
  );
}

export function AccentWord({ text, word }: { text: string; word: string }) {
  const index = text.indexOf(word);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <em className={styles.accentWord}>{word}</em>
      {text.slice(index + word.length)}
    </>
  );
}

export function MediaSlot({
  label,
  variant = "photo",
}: {
  label: string;
  variant?: "video" | "photo";
}) {
  return (
    <figure
      className={`${styles.mediaSlot} ${variant === "video" ? styles.videoSlot : styles.photoSlot}`}
      aria-label={label}
    >
      <div className={styles.mediaCorners} aria-hidden="true" />
      <div className={styles.mediaCenter}>
        {variant === "video" ? (
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M17 11 37 24 17 37Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M8 52V27l16 9V20l16 10V10h14v42H8Zm6-10h4m10 0h4m10 0h4" />
          </svg>
        )}
        <figcaption>{label}</figcaption>
      </div>
      <span className={styles.mediaBrand} aria-hidden="true">
        {acta.brand.method}
      </span>
    </figure>
  );
}

export function Matrix({ animated = false }: { animated?: boolean }) {
  return (
    <figure className={styles.matrix}>
      <figcaption>
        <span>{acta.labels.matrix}</span>
        <span className={styles.smallLabel}>{acta.labels.illustration}</span>
      </figcaption>
      <dl className={styles.matrixGrid}>
        {acta.labels.matrixColumns.map((label, index) => (
          <div key={label} data-method-cell={animated ? "" : undefined}>
            <dt>{label}</dt>
            <dd>{acta.method.matrixRow[index]}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export function DocumentPreview({
  index,
  title,
}: {
  index: number;
  title: string;
}) {
  return (
    <div className={styles.documentPreview} aria-hidden="true">
      <div className={styles.documentTop}>
        <span>{acta.brand.method}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p>{title}</p>
      {index === 0 ? (
        <div className={styles.documentTable}>
          {acta.labels.matrixColumns.map((label, column) => (
            <div key={label}>
              <span>{label}</span>
              <i />
              <i />
              <i />
              <i style={{ width: `${90 - column * 12}%` }} />
            </div>
          ))}
        </div>
      ) : index === 1 ? (
        <div className={styles.riskDiagram}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className={styles.fileIndex}>
          {acta.method.steps.map((step, number) => (
            <div key={step.title}>
              <span>{String(number + 1).padStart(2, "0")}</span>
              <span>{step.title}</span>
              <i />
            </div>
          ))}
        </div>
      )}
      <div className={styles.documentBottom}>{acta.labels.illustration}</div>
    </div>
  );
}
