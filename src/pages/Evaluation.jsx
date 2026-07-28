import useEvaluation from "../hooks/useEvaluation.";
import Information from "../components/Information";
import NavBar from "../components/NavBar";
import Question from "../components/Question";
import styles from "./Evaluation.module.css";
import Finished from "../components/Finished";
import usePostEvaluation from "../hooks/usePostEvaluation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Evaluation = () => {
  const { state, dispatch } = useEvaluation();
  const {
    createEvaluatedTeacher,
    isLoading,
    updateTeacherEvalById,
    getFetchById,
    selectTeacher,
    dispatch: contextDispatch,
  } = usePostEvaluation();

  const { id } = useParams();

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

  useEffect(() => {
    if (id) {
      getFetchById(id);
    } else {
      dispatch({ type: "reset" });
      contextDispatch({ type: "resetSelectedTeacher" });
    }
  }, [id]);

  const handleSubmitEvaluated = async () => {
    // For new evaluation, require all fields
    if (!id && (!status || !name || !semes || !subject)) return;

    if (id) {
      const newUpdated = {
        status: "finished",
        teacherEval,
        strongPoints,
        improvement,
      };
      await updateTeacherEvalById(id, newUpdated);
      dispatch({ type: "finished" });
      return; // 👈 stop here, don’t create
    }

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

      {status === "ready" && (
        <Information
          state={state}
          teacher={selectTeacher}
          dispatch={dispatch}
        />
      )}

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

      {status === "finished" && (
        <Finished state={state} teacher={selectTeacher} />
      )}

      <footer>
        &copy; {new Date().getFullYear()} RICEO. All rights reserved.
      </footer>
    </>
  );
};

export default Evaluation;
