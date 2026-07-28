import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import ShowAllData from "../components/ShowAllData";
import usePostEvaluation from "../hooks/usePostEvaluation";
import { groupDuplicates } from "../utils/dataFilter";
import styles from "./Dashboard.module.css";
import Select from "react-select";
import { useState } from "react";

const Dashboard = () => {
  const { fetchData, isLoading, deleteTeacherById } = usePostEvaluation();

  // filter states
  const [merge, setMerge] = useState(false);
  const [semester, setSemester] = useState(null);
  const [status, setStatus] = useState(null);

  // ✅ merge duplicates if selected
  const mergedData = merge ? groupDuplicates(fetchData || []) : fetchData || [];

  // ✅ apply semester + status filters

  const filteredData = Array.isArray(mergedData)
    ? mergedData.filter((item) => {
        const semesterMatch = semester ? item.semes === semester.value : true;
        const statusMatch = status ? item.status === status.value : true;
        return semesterMatch && statusMatch;
      })
    : [];

  return (
    <>
      <div className={styles.nav}>
        <NavBar />
      </div>

      <div className={styles.recent}>
        <p>Class Observation Data Collection</p>
      </div>

      <div className={styles.filter}>
        <p>Filter Option </p>
        <Select
          placeholder="Merge Duplicate ..."
          options={[
            { value: false, label: "Show Original" },
            { value: true, label: "Merge Finished Duplicates" },
          ]}
          onChange={(opt) => setMerge(opt.value)}
        />
        <Select
          placeholder="Semester..."
          options={[
            { value: "1st Semester", label: "1st Semester" },
            { value: "2nd Semester", label: "2nd Semester" },
          ]}
          onChange={(opt) => setSemester(opt)}
          isClearable
        />
        <Select
          placeholder="Status..."
          options={[
            { value: "finished", label: "Finished" },
            { value: "active", label: "Active" },
          ]}
          onChange={(opt) => setStatus(opt)}
          isClearable
        />
      </div>

      <div className={styles.result}>
        {isLoading ? (
          <Loader />
        ) : (
          <ShowAllData
            data={filteredData}
            deleteTeacher={deleteTeacherById}
            isLoading={isLoading}
          />
        )}
      </div>

      <footer>
        <strong>
          &copy; {new Date().getFullYear()} RICEO. All rights reserved.
        </strong>
      </footer>
    </>
  );
};

export default Dashboard;
