import { facultyData, semester } from "../data/educData";
import { formatDate } from "../utils/dateFormat";
import styles from "./Information.module.css";
import Select from "react-select";

const Information = ({ state, dispatch, teacher }) => {
  const { name, semes, date, subject } = state;

  const hide =
    !(teacher?._id ? teacher.name : name) ||
    !(teacher?._id ? teacher.semes : semes) ||
    !(teacher?._id ? teacher.date : date) ||
    !(teacher?._id ? teacher.subject : subject);

  const handleProceedButton = () => {
    dispatch({ type: "proceed" });
  };
  return (
    <>
      <div className={styles.educClass}>
        <div className={styles.row}>
          <label htmlFor="date">Date Observation</label>
          <input
            type="date"
            id="date"
            value={teacher?._id ? formatDate(teacher.date) : date}
            onChange={(e) =>
              dispatch({
                type: "updateField",
                field: "date",
                value: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="sem">Semeter</label>
          <Select
            classNamePrefix={"custom"}
            id="sem"
            placeholder="Select Semester"
            options={semester.map((sem) => ({
              value: sem,
              label: sem,
            }))}
            value={
              semester
                .map((sem) => ({ value: sem, label: sem }))
                .find(
                  (opt) => opt.value === (teacher?._id ? teacher.semes : semes),
                ) || null // 👈 ensure null, not undefined
            }
            onChange={(selected) =>
              dispatch({
                type: "updateField",
                field: "semes",
                value: selected.value,
              })
            }
          />
        </div>

        <div className={`${styles.row} ${styles.name}`}>
          <label htmlFor="name">Name</label>
          <Select
            classNamePrefix={`${"name"}`}
            id="name"
            placeholder="Search Name"
            options={facultyData.map((name) => ({
              value: name,
              label: name,
            }))}
            value={facultyData
              .map((name) => ({ value: name, label: name }))
              .find(
                (opt) => opt.value === (teacher?._id ? teacher.name : name),
              )}
            onChange={(selected) =>
              dispatch({
                type: "updateField",
                field: "name",
                value: selected.value,
              })
            }
          />
        </div>
      </div>
      <div className={styles.educClassSec}>
        <div className={styles.row}>
          <label htmlFor="sub">Subject Taught</label>
          <input
            type="text"
            id="sub"
            placeholder="Input Subject... "
            value={teacher?._id ? teacher.subject : subject}
            onChange={(e) =>
              dispatch({
                type: "updateField",
                field: "subject",
                value: e.target.value,
              })
            }
          />
        </div>

        {!hide && (
          <div className={styles.row}>
            <button
              className={styles.btn}
              onClick={() => handleProceedButton()}
            >
              {teacher?._id ? "Update" : "Proceed"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Information;
