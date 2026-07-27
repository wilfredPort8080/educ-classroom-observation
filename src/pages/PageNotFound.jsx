import { useEffect, useState } from "react";
import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const [count, setCount] = useState(5);
  const isNavigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCount((num) => num - 1), 1000);

    const redirect = setTimeout(() => isNavigate("/"), 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [isNavigate]);

  return (
    <div className={styles.page}>
      <h1>Page Not Found</h1>
      <h2>Status 404 — The page or resource doesn’t exist.</h2>
      <h3>You’ll be redirected to the home page shortly.</h3>
      <h4> {count} &rarr;</h4>
    </div>
  );
};

export default PageNotFound;
