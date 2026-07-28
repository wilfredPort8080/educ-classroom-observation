import { formatDate } from "../utils/dateFormat";
import { NavLink } from "react-router-dom";
import styles from "./ShowAllData.module.css";

const ShowAllData = ({ data, deleteTeacher, isLoading }) => {
  if (!Array.isArray(data)) return;
  const sortDate = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  return (
    <div className={styles.list}>
      <div className={styles.nav}>
        <h1>Teacher</h1>
        <h1>Date</h1>
        <h1>Subject</h1>
        <h1>Semester</h1>
        <h1 className={styles.status}>Status</h1>
      </div>

      {!data?.length && !isLoading && (
        <h1 className={styles.noData}>
          No Classroom Observation Data Activities
        </h1>
      )}
      {sortDate.map((teacher) => (
        <ul className={styles.ul} key={teacher._id}>
          <li>
            <p>{teacher.name || "No name"}</p>
            <p>{teacher.date ? formatDate(teacher.date) : ""}</p>
            <p>{teacher.subject ? teacher.subject.toUpperCase() : ""}</p>
            <p>{teacher.semes ? teacher.semes.toUpperCase() : ""}</p>
            <NavLink
              className={`${styles.btnCta} ${teacher.status === "finished" ? styles["finish"] : styles["active"]} `}
              to={
                teacher.status === "finished"
                  ? `/dashboard/${teacher._id}`
                  : `/evaluation/${teacher._id}`
              }
              state={{ data: teacher }}
            >
              {teacher.status ? teacher.status.toUpperCase() : ""}
            </NavLink>

            <button
              className={styles.btnDelete}
              onClick={() => deleteTeacher(teacher._id)}
            >
              &times;
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ShowAllData;
