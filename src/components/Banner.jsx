import scap from "../assets/scap1.png";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div>
        <p className={styles.college}>College of Education</p>
        <p className={styles.moto}>
          Enhancing Teaching Through Effective Observations
        </p>
        <p className={styles.motos}>Empowering Educators to Grow and Succeed</p>
        <button className={styles.btn}>
          Schedule Class Observation &rarr;
        </button>
      </div>

      <div>
        <img src={scap} alt="educ logo" />
      </div>
    </div>
  );
};

export default Banner;
