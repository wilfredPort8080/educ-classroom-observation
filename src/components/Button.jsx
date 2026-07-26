const Button = ({
  children,
  className,
  onClick,
  questions,
  answer,
  idx,
  total,
}) => {
  const { title, question: choices } = questions ?? "";

  const allAnswered = choices?.every((c) =>
    answer?.some(
      (a) => a.title === title && a.question === c && a.value !== undefined,
    ),
  );

  const totalQuestion = total?.length;

  if (children === "Next →") {
    if (!allAnswered) return null;
    if (idx === totalQuestion - 1) return null;
  }

  if (children === "← Previous" && idx === 0) return null;

  if (children === "Submit") {
    const isLastSection = idx === totalQuestion - 1;

    if (!isLastSection) return null; // hide if not last section
    if (!allAnswered) return null; // hide if not all answered
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
