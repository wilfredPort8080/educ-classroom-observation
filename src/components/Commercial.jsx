import sched from "../assets/sched.png";
import insight from "../assets/insight.png";
import styles from "./Commercial.module.css";
const Commercial = () => {
  return (
    <div className={styles.commercial}>
      <div className={styles.container}>
        <img src={sched} alt="logo" />
        <div>
          <h4>Observation tool</h4>
          <span>utilize customizable forms for eveluations</span>
        </div>
      </div>

      <div className={styles.container}>
        <img src={insight} alt="logo" />
        <div>
          <h4>Insight reports</h4>
          <span>Get detailed feedback and performance analytics</span>
        </div>
      </div>
    </div>
  );
};

export default Commercial;
