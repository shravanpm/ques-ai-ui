import React from "react";
import styles from "./ProjectCard.module.css";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({
  initials = "SP",
  title = "Sample Project",
  fileCount = 4,
  lastEdited = "a week ago",
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/upload");
  };

  return (
    <div className={styles.card} onClick={handleNavigate}>
      <div className={styles.iconBox}>{initials}</div>
      <div className={styles.projectInfo}>
        <h4 className={styles.projectTitle}>{title}</h4>
        <p className={styles.fileCount}>{fileCount} Files</p>
        <p className={styles.lastEdited}>Last edited {lastEdited}</p>
      </div>
    </div>
  );
};
