import { createContext, useEffect, useReducer } from "react";

const ContextEvaluationForm = createContext();

const initialState = {
  isLoading: false,
  isError: null,
  evaluated: [],
  fetchData: [],
  selectTeacher: [],
};

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://edu-mongo-database.onrender.com/api/"
    : "http://localhost:8080/api/";

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "dataPOST":
      return {
        ...state,
        isLoading: false,
        evaluated: [...state.evaluated, action.payload],
      };
    case "dataFETCH":
      return {
        ...state,
        isLoading: false,
        fetchData: action.payload,
      };
    case "selectedTeacherId":
      return { ...state, isLoading: false, selectTeacher: action.payload };
    case "error":
      return { ...state, isError: action.payload };
    default:
      throw new Error("Action type is unknown");
  }
};

const ContextEvaluationProvider = ({ children }) => {
  const [
    { isLoading, isError, evaluated, fetchData, selectTeacher },
    dispatch,
  ] = useReducer(reducer, initialState);

  const createEvaluatedTeacher = async (teacherData) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}evaluation`, {
        method: "POST",
        body: JSON.stringify(teacherData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      dispatch({ type: "dataPOST", payload: data });
      dispatch({ type: "dataFETCH", payload: [...fetchData, data] });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: "error", payload: err.message });
    }
  };

  const fetchDataEvaluation = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}evaluation`, {});
      const data = await res.json();

      dispatch({ type: "dataFETCH", payload: data });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: "error", payload: err.message });
    }
  };

  const getFetchById = async (id) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}evaluation/${id}`);
      const data = await res.json();
      dispatch({ type: "selectedTeacherId", payload: data });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: "error", payload: err.message });
    }
  };
  useEffect(() => {
    fetchDataEvaluation();
  }, []);

  const value = {
    isLoading,
    isError,
    evaluated,
    createEvaluatedTeacher,
    fetchData,
    getFetchById,
    selectTeacher,
  };

  return (
    <ContextEvaluationForm value={value}>{children}</ContextEvaluationForm>
  );
};

export { ContextEvaluationProvider, ContextEvaluationForm };
