import styles from "./Finished.module.css";
import vmuf from "../assets/vmuf.png";
import { formatDate } from "../utils/dateFormat";

const Finished = ({ state, teacher }) => {
  const { name, semes, subject, date, teacherEval, strongPoints, improvement } =
    state;

  // ✅ Compute general average
  const generalAverage =
    teacherEval.length > 0
      ? (
          teacherEval.reduce((sum, ans) => sum + ans.value, 0) /
          teacherEval.length
        ).toFixed(2)
      : "N/A";

  return (
    <div className={styles.summary} id="printTable">
      <div className={styles.header} id="header">
        <img src={vmuf} alt="vmuf logo" />
        <div>
          <h2>Virgen Milagrosa University Foundation, Inc.</h2>
          <span>
            Martin Posadas Ave. San Pedro Taloy San Carlos City Pangasinan
          </span>
        </div>
      </div>
      <div className={styles.college} id={"college"}>
        <h2>College of Education</h2>
        <p>Teacher Classroom Observation Rating</p>
      </div>

      <div className={styles.information}>
        <p>
          <strong>Name:</strong> {teacher?._id ? teacher.name : name}
        </p>
        <p>
          <strong>Semester:</strong> {teacher?._id ? teacher.semes : semes}
        </p>
        <p>
          <strong>Subject:</strong> {teacher?._id ? teacher.subject : subject}
        </p>
        <p>
          <strong>Date Observed:</strong>{" "}
          {teacher?._id ? formatDate(teacher.date) : date}
        </p>
      </div>

      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th className={styles.ratingValue} id="rating">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(
              teacherEval.reduce((acc, ans) => {
                if (!acc[ans.title]) acc[ans.title] = [];
                acc[ans.title].push(ans);
                return acc;
              }, {}),
            ).map((section, sIdx) => (
              <>
                {/* Section header row */}
                <tr key={`section-${sIdx}`}>
                  <td
                    colSpan={2}
                    style={{ fontWeight: "bold", background: "#f0f0f0" }}
                    id="cat"
                  >
                    🖊️ {section[0].title}
                  </td>
                </tr>
                {/* Section questions */}
                {section.map((ans, qIdx) => (
                  <tr key={`q-${sIdx}-${qIdx}`}>
                    <td>💫{ans.question}</td>
                    <td className={styles.ratingValue} id="rating">
                      {ans.value}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.average}>
        <h3>📊 General Average</h3>
        <p>{generalAverage}</p>
      </div>

      <div className={styles.comments}>
        <h3>🖊️ Strong Points</h3>

        <ul>
          <li> {strongPoints && `💫 ${strongPoints} `}</li>
        </ul>

        <h3>🖊️ Points for Improvement</h3>
        <ul>
          <li>{improvement && `💫 ${improvement}`}</li>
        </ul>
      </div>

      <div className={styles.signature}>
        <span></span>
        <p>Signature over Printed Name</p>
      </div>

      <button
        onClick={() => window.print()}
        className={styles.printBtn}
        id="print"
      >
        🖨️ Print Table Only
      </button>
    </div>
  );
};

export default Finished;
