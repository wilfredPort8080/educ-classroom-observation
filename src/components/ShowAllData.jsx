import { formatDate } from "../utils/dateFormat";
import { NavLink } from "react-router-dom";
import styles from "./ShowAllData.module.css";

const ShowAllData = ({ data }) => {
  return (
    <div className={styles.list}>
      <div className={styles.nav}>
        <h1>Teacher</h1>
        <h1>Date</h1>
        <h1>Subject</h1>
        <h1>Semester</h1>
        <h1 className={styles.status}>Status</h1>
      </div>
      {data.map((teacher) => (
        <ul className={styles.ul} key={teacher._id}>
          <li>
            <p>{teacher.name}</p>
            <p>{formatDate(teacher.date)}</p>
            <p>{teacher.subject.toUpperCase()}</p>
            <p>{teacher.semes}</p>
            <NavLink
              className={`${styles.btnCta} ${teacher.status === "finished" ? styles["finish"] : styles["active"]} `}
              to={`/dashboard/${teacher._id}`}
              state={{ data: teacher }}
            >
              {teacher.status.toUpperCase()}
            </NavLink>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ShowAllData;
