import { useNavigate } from "react-router-dom";
import usePostEvaluation from "../hooks/usePostEvaluation";
import styles from "./Recent.module.css";
import RecentData from "./RecentData";
import Loader from "./Loader";

const Recent = () => {
  const { fetchData, isLoading } = usePostEvaluation();
  const isNavigate = useNavigate();
  return (
    <>
      <div className={styles.recent}>
        <p>Recent Class Observation</p>
        <button onClick={() => isNavigate("/dashboard")}>
          View All &rarr;
        </button>
      </div>

      <div className={styles.result}>
        {!fetchData?.length && !isLoading && <h1>No Recent Activities</h1>}
        {isLoading ? <Loader /> : <RecentData data={fetchData} />}
      </div>
    </>
  );
};

export default Recent;
