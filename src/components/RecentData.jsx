import { NavLink } from "react-router-dom";
import { formatDate } from "../utils/dateFormat";
import styles from "./RecentData.module.css";

const RecentData = ({ data }) => {
  if (!Array.isArray(data)) return;
  const latestData = [...data]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className={styles.list}>
      <div className={styles.nav}>
        <h1>Teacher</h1>
        <h1>Date</h1>
        <h1>Subject</h1>
        <h1>Semester</h1>
        <h1 className={styles.status}>Status</h1>
      </div>
      {latestData.map((teacher) => (
        <ul className={styles.ul} key={teacher._id}>
          <li>
            <p>{teacher.name}</p>
            <p>{formatDate(teacher.date)}</p>
            <p>{teacher.subject.toUpperCase()}</p>
            <p>{teacher.semes.toUpperCase()}</p>
            <NavLink
              className={`${styles.btnCta} ${teacher.status === "finished" ? styles["finish"] : styles["active"]} `}
              to={
                teacher.status === "finished"
                  ? `/dashboard/${teacher._id}`
                  : `/evaluation/${teacher._id}`
              }
            >
              {teacher.status.toUpperCase()}
            </NavLink>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default RecentData;
