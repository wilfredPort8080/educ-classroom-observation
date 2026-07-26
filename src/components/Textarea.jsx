import styles from "./Textarea.module.css";

const Textarea = ({ children, idx, total, onChange, value }) => {
  const totalQuestion = total?.length;

  const isLastSection = idx === totalQuestion - 1;

  if (!isLastSection) return null; // hide if not last section

  return (
    <label className={styles.textarea}>
      <h4>{children}</h4>
      <textarea onChange={onChange} value={value} />
    </label>
  );
};

export default Textarea;
