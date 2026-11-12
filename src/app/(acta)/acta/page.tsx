import {
  acta,
  formatMxn,
  getActaQuestions,
  getActaStack,
  guardiaCopy,
} from "@/content/acta";
import {
  AccentWord,
  ActaCta,
  DocumentPreview,
  HeroHeadline,
  Matrix,
  MediaSlot,
  SectionIndex,
} from "@/components/acta/acta-ui";
import {
  CountUp,
  MethodScene,
  RevealLines,
  Stagger,
} from "@/components/acta/animation-scenes";
import styles from "./acta.module.css";

export default function ActaPage() {
  return (
    <>
      <section className={styles.urgency} aria-label={acta.brand.method}>
        <div className={styles.container}>
          <p>
            <span className={styles.urgencyMark} aria-hidden="true" />
            {acta.urgency}
          </p>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.hero}`}
        aria-labelledby="acta-hero"
      >
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{acta.hero.eyebrow}</p>
          <RevealLines>
            <HeroHeadline />
          </RevealLines>
          <p className={styles.heroSubtitle}>{acta.hero.subtitle}</p>
          <div className={styles.heroActions}>
            <a className={styles.textLink} href={`#${acta.method.id}`}>
              {acta.hero.secondary}
            </a>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <div className={styles.mediaOverline}>
            <span>{acta.brand.method}</span>
            <span>{acta.brand.edition}</span>
          </div>
          <MediaSlot label={acta.hero.media} variant="video" />
          <div className={styles.heroLetters} aria-hidden="true">
            {acta.method.steps.map((step, index) => (
              <span key={step.title}>
                {step.letter}
                {index < 3 ? <i>·</i> : null}
              </span>
            ))}
          </div>
        </div>
        <ul className={styles.proof}>
          {acta.hero.proof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="acta-para-ti"
      >
        <SectionIndex number={3} />
        <div className={styles.audienceGrid}>
          <div>
            <h2 id="acta-para-ti">{acta.audience.yesTitle}</h2>
            <ul className={styles.editorialList}>
              {acta.audience.yes.map((item) => (
                <li key={item}>
                  <span className={styles.check} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.audienceNo}>
            <h3>{acta.audience.noTitle}</h3>
            <ul className={styles.editorialList}>
              {acta.audience.no.map((item) => (
                <li key={item}>
                  <span className={styles.cross} aria-hidden="true">
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className={styles.darkBand}
        aria-labelledby="acta-costo"
        data-dark-band
      >
        <div className={`${styles.container} ${styles.section}`}>
          <SectionIndex number={4} />
          <h2 id="acta-costo" className={styles.costTitle}>
            <AccentWord text={acta.cost.title} word={acta.cost.accent} />
          </h2>
          <div className={styles.costGrid}>
            <div className={styles.costAmount}>
              <p className={styles.costRange}>
                {acta.cost.rangeFrom} {formatMxn(acta.cost.minimum)}{" "}
                {acta.cost.rangeTo}
              </p>
              <p className={styles.costNumber}>
                <CountUp value={acta.cost.maximum} />
              </p>
              <p className={styles.costExplanation}>{acta.cost.explanation}</p>
            </div>
            <div className={styles.costConsequences}>
              <p className={styles.costLead}>{acta.cost.lead}</p>
              <Stagger className={styles.costItems}>
                {acta.cost.items.map((item, index) => (
                  <p data-stagger-item key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item}
                  </p>
                ))}
              </Stagger>
            </div>
          </div>
          <p className={styles.costClosing}>{acta.cost.closing}</p>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="acta-diferencia"
      >
        <SectionIndex number={5} />
        <h2 id="acta-diferencia" className={styles.wideTitle}>
          {acta.comparison.title}
        </h2>
        <div className={styles.comparison}>
          <div className={styles.comparisonHeader}>
            <span>{acta.labels.before}</span>
            <span>{acta.labels.after}</span>
          </div>
          {acta.comparison.rows.map((row) => (
            <div className={styles.comparisonRow} key={row.before}>
              <p>
                <span className={styles.mobileLabel}>{acta.labels.before}</span>
                {row.before}
              </p>
              <p>
                <span className={styles.mobileLabel}>{acta.labels.after}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m5 12 4 4L19 6" />
                </svg>
                {row.after}
              </p>
            </div>
          ))}
        </div>
        <p className={styles.comparisonClosing}>{acta.comparison.closing}</p>
      </section>

      <section className={styles.sandSection} aria-labelledby="acta-caso">
        <div className={`${styles.container} ${styles.section}`}>
          <SectionIndex number={6} />
          <div className={styles.caseGrid}>
            <div className={styles.caseNumber} aria-hidden="true">
              {String(acta.case.measures).padStart(2, "0")}
              <span>{acta.brand.method}</span>
            </div>
            <div className={styles.caseCopy}>
              <h2 id="acta-caso">{acta.case.title}</h2>
              {acta.case.paragraphs.map((text, index) => (
                <p
                  className={index === 1 ? styles.caseEmphasis : undefined}
                  key={text}
                >
                  {text}
                </p>
              ))}
              {acta.casoResultado === null ? null : <p>{acta.casoResultado}</p>}
            </div>
          </div>
          <Matrix />
        </div>
      </section>

      <section
        id={acta.method.id}
        className={styles.methodSection}
        aria-labelledby="acta-metodo"
      >
        <MethodScene>
          <div className={`${styles.container} ${styles.methodInner}`}>
            <SectionIndex number={7} />
            <h2 id="acta-metodo" className={styles.methodTitle}>
              {acta.method.title}
            </h2>
            <div className={styles.methodGrid}>
              <div className={styles.methodLetters} aria-hidden="true">
                {acta.method.steps.map((step, index) => (
                  <span key={step.title}>
                    <b data-method-letter>{step.letter}</b>
                    {index < 3 ? <i>·</i> : null}
                  </span>
                ))}
              </div>
              <div data-method-stage className={styles.methodSteps}>
                {acta.method.steps.map((step, index) => (
                  <article
                    className={styles.methodStep}
                    key={step.title}
                    data-method-step
                  >
                    <div className={styles.stepRule} data-step-rule />
                    <div className={styles.stepHeading}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>
                        <span className={styles.mobileStepLetter}>
                          {step.letter} ·{" "}
                        </span>
                        {step.title}
                      </h3>
                    </div>
                    <p>{step.description}</p>
                    <p className={styles.received}>
                      <strong>{acta.labels.receives}</strong> {step.received}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <Matrix animated />
          </div>
        </MethodScene>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="acta-momento"
      >
        <SectionIndex number={8} />
        <h2 id="acta-momento" className={styles.wideTitle}>
          {acta.timing.title}
        </h2>
        <div className={styles.timingGrid}>
          {acta.timing.items.map((item, index) => (
            <article key={item.when}>
              <div className={styles.timingTop}>
                <span className={styles.chip}>{item.when}</span>
                <span className={styles.timingNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p className={styles.sectionNote}>{acta.timing.note}</p>
      </section>

      <section
        className={`${styles.container} ${styles.section} ${styles.tangibleSection}`}
        aria-labelledby="acta-entregables"
      >
        <SectionIndex number={9} />
        <h2 id="acta-entregables" className={styles.wideTitle}>
          {acta.tangible.title}
        </h2>
        <div className={styles.tangibleGrid}>
          {acta.tangible.items.map((item, index) => (
            <article key={item.title}>
              <DocumentPreview index={index} title={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p className={styles.illustrationNote}>{acta.tangible.note}</p>
      </section>

      <section className={styles.bioSection} aria-labelledby="acta-fer">
        <div className={`${styles.container} ${styles.section}`}>
          <SectionIndex number={10} />
          <div className={styles.bioGrid}>
            <MediaSlot label={acta.bio.media} />
            <div>
              <h2 id="acta-fer">{acta.bio.title}</h2>
              {acta.bio.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {acta.cedula === null ? null : <p>{acta.cedula}</p>}
              <ActaCta section="quien-soy" />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="acta-blindaje"
      >
        <SectionIndex number={11} />
        <div className={styles.offerGrid}>
          <div className={styles.offerIntro}>
            <h2 id="acta-blindaje">{acta.offer.title}</h2>
            <p>{acta.offer.subtitle}</p>
            <div className={styles.offerSeal} aria-hidden="true">
              <span>{acta.brand.method}</span>
              <b>{String(acta.offer.days)}</b>
              <span>{acta.brand.name}</span>
            </div>
          </div>
          <Stagger individual className={styles.stack}>
            {getActaStack().map((item, index) => (
              <article key={item.title} data-stagger-item>
                <span className={styles.stackNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  {item.bonus ? (
                    <span className={styles.chip}>{acta.labels.bonus}</span>
                  ) : null}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p className={styles.avoids}>
                    <strong>{acta.labels.avoids}</strong> {item.avoids}
                  </p>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.guarantee}`}
        aria-labelledby="acta-garantia"
      >
        <div className={styles.guaranteeMark} aria-hidden="true">
          <svg viewBox="0 0 64 72" fill="none">
            <path d="M32 3 59 14v24L32 68 5 38V14L32 3Z" />
            <path d="m19 33 9 9 18-20" />
          </svg>
        </div>
        <div>
          <SectionIndex number={12} />
          <h2 id="acta-garantia">{acta.guarantee.title}</h2>
          <p>
            {acta.guardiaMeses === null
              ? acta.guarantee.year
              : guardiaCopy(acta.guarantee.months)}
          </p>
          <p className={styles.guaranteeClosing}>{acta.guarantee.closing}</p>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="acta-inversion"
      >
        <SectionIndex number={13} />
        <div className={styles.investmentGrid}>
          <div>
            <h2 id="acta-inversion">{acta.investment.title}</h2>
            <p className={styles.priceAnchor}>{acta.investment.anchor}</p>
          </div>
          <div className={styles.priceBlock}>
            <p className={styles.priceProduct}>
              {acta.investment.product} {acta.labels.priceFrom}
            </p>
            <p className={styles.price}>
              {formatMxn(acta.investment.price)}{" "}
              <span>{acta.labels.currency}.</span>
            </p>
            <p>{acta.investment.explanation}</p>
            {acta.actaPreviaPrice === null ? null : (
              <p>
                {acta.investment.diagnostic.replace(
                  "{actaPreviaPrice}",
                  formatMxn(acta.actaPreviaPrice),
                )}
              </p>
            )}
            <p className={styles.defense}>{acta.investment.defense}</p>
            <ActaCta section="inversion" />
          </div>
        </div>
      </section>

      <section
        className={`${styles.darkBand} ${styles.capacity}`}
        aria-labelledby="acta-cupos"
        data-dark-band
      >
        <div className={`${styles.container} ${styles.section}`}>
          <SectionIndex number={14} />
          <div className={styles.capacityGrid}>
            <h2 id="acta-cupos">{acta.capacity.title}</h2>
            <div>
              <p>{acta.capacity.description}</p>
              <p className={styles.capacityClosing}>
                <AccentWord
                  text={acta.capacity.closing}
                  word={acta.capacity.accent}
                />
              </p>
              <ActaCta section="cupos" />
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="acta-preguntas"
      >
        <SectionIndex number={15} />
        <div className={styles.faqGrid}>
          <h2 id="acta-preguntas">{acta.faq.title}</h2>
          <div className={styles.faq}>
            {getActaQuestions().map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section} ${styles.closing}`}
        aria-labelledby="acta-empezamos"
      >
        <SectionIndex number={16} />
        <div className={styles.closingGrid}>
          <div>
            <h2 id="acta-empezamos">{acta.closing.title}</h2>
            <p>{acta.closing.note}</p>
            <ActaCta section="cierre" />
          </div>
          <ol>
            {acta.closing.steps.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
