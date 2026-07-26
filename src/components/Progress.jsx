import styles from "./Progress.module.css";

const Progress = ({ idx, questions }) => {
  return (
    <div className={styles.progress}>
      <p>Progress</p>
      <progress max={questions?.length} value={idx + 1} />
      <p>{`${idx + 1} / ${questions?.length}`}</p>
    </div>
  );
};

export default Progress;
