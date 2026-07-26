import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.section}>
      <nav className={styles.nav}>
        <div>
          <NavLink to={"/"}>📖 Teacher Classroom Observation</NavLink>
        </div>

        <ul>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>

          <li className={styles.linkBta}>
            <NavLink to={"/evaluate-tools"}>Observation tools</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
