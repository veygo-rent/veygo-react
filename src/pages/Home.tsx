import { Link } from "react-router";

import styles from "../css/home.module.css";

const fleetHighlights = [
  {
    title: "City Smart",
    body: "Compact hybrids for daily commutes, app-unlock ready, and easy parking in dense neighborhoods.",
  },
  {
    title: "Weekend Escape",
    body: "Crossovers and SUVs with room for luggage, ski gear, and longer road-trip comfort.",
  },
  {
    title: "Executive Ride",
    body: "Premium sedans with priority support, contactless pickup, and trip-level protection options.",
  },
];

const processSteps = [
  "Choose a car and pickup time in under two minutes.",
  "Verify your profile once and unlock from your phone.",
  "Return in any approved zone with automatic trip summary.",
];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>Premium Car Rental Platform</span>
          <h1>Drive the right car, right now.</h1>
          <p>
            Veygo blends instant booking, transparent rates, and clear policy controls so every trip
            is predictable before you even start the engine.
          </p>
          <div className={styles.heroActions}>
            <Link to="/membership" className={styles.primaryCta}>
              Explore Membership
            </Link>
            <Link to="/rental-agreement" className={styles.secondaryCta}>
              Review Rental Terms
            </Link>
          </div>
          <div className={styles.stats}>
            <article>
              <strong>95%</strong>
              <span>same-day pickup success</span>
            </article>
            <article>
              <strong>24/7</strong>
              <span>trip support availability</span>
            </article>
            <article>
              <strong>4.9/5</strong>
              <span>driver satisfaction score</span>
            </article>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <img src="/profile_banner.jpg" alt="Veygo vehicle showcase" />
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <header>
          <span className={styles.sectionLabel}>Fleet tiers</span>
          <h2>Cars for every trip profile</h2>
        </header>
        <div className={styles.cardGrid}>
          {fleetHighlights.map((item) => (
            <article key={item.title} className={styles.infoCard}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <header>
          <span className={styles.sectionLabel}>How it works</span>
          <h2>From booking to return in three steps</h2>
        </header>
        <ol className={styles.stepList}>
          {processSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
