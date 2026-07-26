import styles from "./Question.module.css";
import Button from "./Button";
import Progress from "./Progress";
import Textarea from "./Textarea";
import Loader from "./Loader";

const ratings = [5, 4, 3, 2, 1];

const Question = ({
  questions,
  dispatch,
  answer,
  idx,
  total,
  strongPoints,
  improvement,
  submit,
  loading,
}) => {
  const { title, question: choices } = questions;

  const handleNextButton = () => {
    dispatch({ type: "next" });
  };

  const handlePreviousButton = () => {
    dispatch({ type: "previous" });
  };

  const handleCreateObserve = () => {
    submit();
  };

  const handleStrongComment = (e) => {
    dispatch({ type: "strong", payload: e.target.value });
  };

  const handleImprovements = (e) => {
    dispatch({ type: "improvement", payload: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className={styles.header}>
            <h5>
              Please select the Teacher Applicant’s performance rating using the
              scale below:
            </h5>
            <p>
              5 – Outstanding 4 – Very Satisfactory 3 – Satisfactory 2 – Fair 1
              – Needs Improvement
            </p>
          </div>
          <Progress idx={idx} questions={total} />
          <div className={styles.question}>
            <div className={styles.title}>
              <h4>🖊️{title} </h4>
              <div className={styles.scale}>
                {ratings.map((r) => (
                  <h4 key={r}>{r}</h4>
                ))}
              </div>
            </div>
            <ul>
              {choices.map((c, idx) => {
                const existing = answer.find(
                  (a) => a.title === title && a.question === c,
                );
                return (
                  <li key={c} className={`${styles.title} ${styles.line}`}>
                    <p>{c}</p>
                    <div className={styles.scale}>
                      {ratings.map((circle) => (
                        <label key={circle}>
                          <input
                            type="radio"
                            name={`question-${title}-${idx}`} // ✅ unique per question
                            value={circle}
                            checked={existing?.value === circle}
                            onChange={() =>
                              dispatch({
                                type: "setRating",
                                payload: {
                                  title: title,
                                  question: c,
                                  value: circle,
                                },
                              })
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={styles.text}>
              <Textarea
                idx={idx}
                total={total}
                value={strongPoints}
                onChange={handleStrongComment}
              >
                Strong Points
              </Textarea>

              <Textarea
                idx={idx}
                total={total}
                value={improvement}
                onChange={handleImprovements}
              >
                Points for Improvements
              </Textarea>
            </div>

            <div className={styles.btnSide}>
              <Button
                className={styles.btn}
                onClick={handlePreviousButton}
                idx={idx}
              >
                &larr; Previous
              </Button>

              <Button
                className={styles.btn}
                onClick={handleNextButton}
                questions={questions}
                answer={answer}
                idx={idx}
                total={total}
              >
                Next &rarr;
              </Button>

              <Button
                className={styles.btn}
                answer={answer}
                idx={idx}
                total={total}
                questions={questions}
                onClick={handleCreateObserve}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Question;
