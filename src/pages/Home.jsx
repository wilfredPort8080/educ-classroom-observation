import Banner from "../components/Banner";
import Commercial from "../components/Commercial";
import NavBar from "../components/NavBar";
import Recent from "../components/Recent";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
      <main>
        <div>
          <section className={styles.mainSection}>
            <NavBar />
          </section>

          <section className={`${styles.mainSection} ${styles.mainSecond}`}>
            <Banner />
          </section>

          <section>
            <Commercial />
          </section>

          <section className={styles.history}>
            <Recent />
          </section>

          <section className={styles.mainSection}>
            <p className={styles.title}>Support Teacher Growth & Development</p>

            <footer>
              &copy; {new Date().getFullYear()} RICEO. All rights reserved.
            </footer>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
