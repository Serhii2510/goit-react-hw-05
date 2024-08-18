import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import IconLogo from '../IconLogo/IconLogo';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <header className={css.header}>
      <IconLogo />
      <nav className={css.nav}>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="/movies" className={buildLinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
