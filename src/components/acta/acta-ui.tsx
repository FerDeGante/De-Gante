import { acta } from "@/content/acta";
import styles from "@/app/(acta)/acta/acta.module.css";

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
