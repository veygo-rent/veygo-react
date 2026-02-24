import { Link } from "react-router";

import styles from "../css/about.module.css";

const principles = [
  {
    title: "Clear pricing",
    body: "Every fee is visible before checkout so renters can decide quickly with confidence.",
  },
  {
    title: "Fast support",
    body: "In-app and human support stay available through trip start, extension, and return.",
  },
  {
    title: "Policy clarity",
    body: "Legal and operational policy updates are published with effective dates for transparency.",
  },
];

export default function About() {
  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <span>About Veygo</span>
        <h1>Built for modern renters who value speed and trust.</h1>
        <p>
          Veygo started with one assumption: renting should feel like opening a high-quality app,
          not filling out paperwork. We redesigned the flow around clear terms, instant booking,
          and stable support operations.
        </p>
        <Link to="/privacy" className={styles.linkButton}>
          Review Privacy Policy
        </Link>
      </section>

      <section className={styles.cards}>
        {principles.map((principle) => (
          <article key={principle.title}>
            <h2>{principle.title}</h2>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
