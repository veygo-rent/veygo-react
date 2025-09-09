import { useState } from 'react';
import { Link } from 'react-router';

import classes from '../css/nav.module.css';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarLogo}>
                <Link to="/">Veygo Rentals</Link>
            </div>
            <button
                className={classes.hamburger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                ☰
            </button>
            <div className={`${classes.navContent} ${isOpen ? classes.show : ''}`}>
                <ul className={classes.navbarLinks}>
                    <li><Link to="/pricing">Pricing</Link></li>
                    <li><Link to="/locations">Locations</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <div className={classes.navbarAuth}>
                    <Link to="/login" className={classes.btn}>Sign In</Link>
                    <Link to="/signup" className={`${classes.btn} ${classes.btnPrimary}`}>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}