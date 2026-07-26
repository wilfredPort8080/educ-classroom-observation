import useEvaluation from "../hooks/useEvaluation.";
import Information from "../components/Information";
import NavBar from "../components/NavBar";
import Question from "../components/Question";
import styles from "./Evaluation.module.css";
import Finished from "../components/Finished";
import usePostEvaluation from "../hooks/usePostEvaluation";

const Evaluation = () => {
  const { state, dispatch } = useEvaluation();
  const { createEvaluatedTeacher, isLoading } = usePostEvaluation();

  const {
    status,
    idx,
    question,
    teacherEval,
    strongPoints,
    improvement,
    name,
    semes,
    subject,
    date,
  } = state;

  const handleSubmitEvaluated = async () => {
    if (!status || !name || !semes || !subject) return;

    const newEvaluated = {
      status: "finished",
      name,
      semes,
      subject,
      date,
      teacherEval,
      strongPoints,
      improvement,
    };

    await createEvaluatedTeacher(newEvaluated);
    dispatch({ type: "finished" });
  };

  return (
    <>
      <div className={styles.evalNav} id="nav">
        <NavBar />
      </div>

      {status === "ready" && <Information state={state} dispatch={dispatch} />}

      {status === "active" && (
        <Question
          questions={question[idx]}
          total={question}
          dispatch={dispatch}
          answer={teacherEval}
          idx={idx}
          strongPoints={strongPoints}
          improvement={improvement}
          submit={handleSubmitEvaluated}
          loading={isLoading}
        />
      )}

      {status === "finished" && <Finished state={state} />}

      <footer>
        &copy; {new Date().getFullYear()} RICEO. All rights reserved.
      </footer>
    </>
  );
};

export default Evaluation;
