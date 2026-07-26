import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePostEvaluation from "../hooks/usePostEvaluation";
import { useEffect } from "react";
import styles from "./SelectedTeacher.module.css";
import vmuf from "../assets/vmuf.png";
import { formatDate } from "../utils/dateFormat";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";

const SelectedTeacher = () => {
  const { id } = useParams();
  const { getFetchById, selectTeacher, isLoading } = usePostEvaluation();
  const location = useLocation();
  const teacherFromState = location.state?.data;

  const isNavigate = useNavigate();
  const handleBack = () => {
    isNavigate(-1);
  };
  useEffect(() => {
    if (!teacherFromState) {
      getFetchById(id);
    }
  }, [id, teacherFromState]);

  const teacher = teacherFromState || selectTeacher;

  if (!teacher || Object.keys(teacher).length === 0) return;

  const { name, semes, subject, date, teacherEval, strongPoints, improvement } =
    teacher;

  // ✅ Compute general average
  const generalAverage =
    teacherEval?.length > 0
      ? (
          teacherEval?.reduce((sum, ans) => sum + ans?.value, 0) /
          teacherEval?.length
        ).toFixed(2)
      : "N/A";

  return (
    <>
      <div className={styles.evalNav} id="nav">
        <NavBar />
      </div>
      <div id="btn" className={styles.btn}>
        <button onClick={handleBack} id="btn">
          &larr; Back
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Semester:</strong> {semes}
              </p>
              <p>
                <strong>Subject:</strong> {subject}
              </p>
              <p>
                <strong>Date Observed:</strong> {formatDate(date)}
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
                  {Object?.values(
                    teacherEval?.reduce((acc, ans) => {
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
                <li>💫 {strongPoints}</li>
              </ul>

              <h3>🖊️ Points for Improvement</h3>
              <ul>
                <li>💫 {improvement}</li>
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
        </>
      )}
    </>
  );
};

export default SelectedTeacher;
