const groupDuplicates = (data) => {
  const grouped = {};

  data.forEach((item) => {
    // ✅ Only merge if status is "finished"
    if (item.status !== "finished") return;

    const key = `${item.name}-${item.date}-${item.subject}-${item.semes}-${item.status}`;

    if (!grouped[key]) {
      grouped[key] = { ...item, count: 1 };
    } else {
      grouped[key].count += 1;

      if (item.teacherEval) {
        grouped[key].teacherEval = [
          ...(grouped[key].teacherEval || []),
          ...item.teacherEval,
        ];
      }
      if (item.strongPoints) {
        grouped[key].strongPoints =
          (grouped[key].strongPoints || "") + "|" + item.strongPoints;
      }
      if (item.improvement) {
        grouped[key].improvement =
          (grouped[key].improvement || "") + "|" + item.improvement;
      }
    }
  });
  return Object.values(grouped);
};

export { groupDuplicates };
