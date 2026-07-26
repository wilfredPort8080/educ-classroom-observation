const formatDate = (date) => {
  if (!date) return;
  return new Date(date).toISOString().split("T")[0]; // "2026-07-16"
};

export { formatDate };
