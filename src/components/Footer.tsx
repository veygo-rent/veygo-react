import { Link } from 'react-router';

import styles from '../css/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav aria-label="Footer navigation" className={styles.footerNav}>
        <div className={styles.footerGrid}>
          {/* About Veygo */}
          <section aria-labelledby="footer-about">
            <h3 id="footer-about" className={styles.footerSectionTitle}>About Veygo</h3>
            <ul className={styles.footerList}>
              <li><Link to="/investors">Investor Relations</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/leadership">Leadership</Link></li>
              <li><Link to="/press">Press</Link></li>
            </ul>
          </section>

          {/* Reward Program */}
          <section aria-labelledby="footer-rewards">
            <h3 id="footer-rewards" className={styles.footerSectionTitle}>Reward Program</h3>
            <ul className={styles.footerList}>
              <li><Link to="/memberships">Memberships</Link></li>
              <li><Link to="/subscriptions">Subscriptions</Link></li>
              <li><Link to="/go-points">Go Points</Link></li>
              <li><Link to="/merchant-discounts">Merchant Discounts</Link></li>
            </ul>
          </section>

          {/* Policies */}
          <section aria-labelledby="footer-policies">
            <h3 id="footer-policies" className={styles.footerSectionTitle}>Policies</h3>
            <ul className={styles.footerList}>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/membership">Membership Agreement</Link></li>
              <li><Link to="/rental-agreement">Rental Agreement</Link></li>
            </ul>
          </section>
        </div>

        <div className={styles.footerBottom}>
          <small className={styles.footerSmall}>
            © {new Date().getFullYear()} Veygo. All rights reserved.
          </small>
          <small className={styles.footerSmall}>
            Need help? <Link to="/support">Contact Support</Link>
          </small>
        </div>
      </nav>
    </footer>
  );
}