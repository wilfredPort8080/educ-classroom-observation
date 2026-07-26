import { useContext } from "react";
import { ContextEvaluationForm } from "../context/ContextEvaluationForm";

const usePostEvaluation = () => {
  const context = useContext(ContextEvaluationForm);
  if (context === undefined) throw new Error("Data context is out of range!");
  return context;
};

export default usePostEvaluation;
