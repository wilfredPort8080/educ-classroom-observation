import { useReducer } from "react";
import { evaluationRubric } from "../data/educData";
import { formatDate } from "../utils/dateFormat";

const initialState = {
  status: "ready", //readt active finished
  name: "",
  semes: "",
  subject: "",
  date: formatDate(new Date()),
  question: evaluationRubric,
  idx: 0,
  teacherEval: [],
  strongPoints: "",
  improvement: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value, status: "ready" };
    case "proceed":
      return { ...state, status: "active" };
    case "setRating": {
      const { title, question, value } = action.payload;

      // check if answer already exists
      const existingIndex = state.teacherEval.findIndex(
        (a) => a.title === title && a.question === question,
      );

      let updatedAnswers;
      if (existingIndex !== -1) {
        // replace existing answer
        updatedAnswers = [...state.teacherEval];
        updatedAnswers[existingIndex] = { title, question, value };
      } else {
        // add new answer
        updatedAnswers = [...state.teacherEval, { title, question, value }];
      }

      return {
        ...state,
        teacherEval: updatedAnswers,
      };
    }

    case "strong":
      return { ...state, strongPoints: action.payload };
    case "improvement":
      return { ...state, improvement: action.payload };
    case "finished":
      return { ...state, status: "finished" };
    case "next":
      return { ...state, idx: state.idx + 1, status: "active" };
    case "previous":
      return { ...state, idx: state.idx - 1, status: "active" };
    case "reset":
      return initialState;
    default:
      throw new Error(`Action type is unknown!`);
  }
};

const useEvaluation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useEvaluation;
