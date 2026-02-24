import { Link } from "react-router";

import styles from "../css/footer.module.css";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "Company" },
      { to: "/membership", label: "Membership" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/membership", label: "Membership Agreement" },
      { to: "/rental-agreement", label: "Rental Agreement" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <section className={styles.brandPanel}>
          <h2>Veygo</h2>
          <p>
            Modern car rental made simple. Book, unlock, and drive with transparent pricing and
            policies that stay easy to read.
          </p>
        </section>

        <nav className={styles.columns} aria-label="Footer navigation">
          {footerColumns.map((column) => (
            <section key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <small>© {new Date().getFullYear()} Veygo. All rights reserved.</small>
        <small>Support: hello@veygo.rent</small>
      </div>
    </footer>
  );
}
