import { useState } from "react";
import { Link, NavLink } from "react-router";

import type { ThemeMode } from "../hooks/useThemeMode";
import classes from "../css/nav.module.css";

interface NavBarProps {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/rental-agreement", label: "Rental" },
  { to: "/membership", label: "Membership" },
  { to: "/privacy", label: "Privacy" },
];

export default function NavBar({ themeMode, onThemeChange }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={classes.shell}>
      <nav className={classes.navbar} aria-label="Primary navigation">
        <Link to="/" className={classes.brand}>
          <img src="/profile_logo.jpg" alt="Veygo logo" className={classes.brandLogo} />
          <span className={classes.brandText}>Veygo</span>
        </Link>

        <button
          type="button"
          className={classes.menuToggle}
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span />
          <span />
          <span />
        </button>

        <div id="mobile-nav" className={`${classes.navContent} ${isOpen ? classes.open : ""}`}>
          <ul className={classes.navLinks}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${classes.navLink} ${isActive ? classes.navLinkActive : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={classes.actions}>
            <label className={classes.themeLabel} htmlFor="theme-mode">
              Theme
            </label>
            <select
              id="theme-mode"
              className={classes.themeSelect}
              value={themeMode}
              onChange={(event) => onThemeChange(event.target.value as ThemeMode)}
              aria-label="Theme mode"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            <Link to="/" className={classes.primaryButton} onClick={() => setIsOpen(false)}>
              Reserve now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
