import { useEffect, useState } from "react";
import styles from "./PageNotFound.module.css";
import { useNavigate, useRouteError } from "react-router-dom";

const PageNotFound = () => {
  const [count, setCount] = useState(5);
  const isNavigate = useNavigate();
  const error = useRouteError();

  useEffect(() => {
    if (!error) {
      const timer = setInterval(() => setCount((num) => num - 1), 1000);

      const redirect = setTimeout(() => isNavigate("/"), 5000);
      return () => {
        clearInterval(timer);
        clearTimeout(redirect);
      };
    }
  }, [isNavigate]);

  return (
    <div className={styles.page}>
      {error ? (
        <>
          <h1>Opps!</h1>
          <h2>Unexpected Application Error</h2>
          <h3>{error.statusText || error.message}</h3>
        </>
      ) : (
        <>
          <>
            <h1>Page Not Found</h1>
            <h2>Status 404 — The page or resource doesn’t exist.</h2>
            <h3>You’ll be redirected to the home page shortly.</h3>
            <h4> {count} &rarr;</h4>
          </>
        </>
      )}
    </div>
  );
};

export default PageNotFound;
