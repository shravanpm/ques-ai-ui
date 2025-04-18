import React from "react";
import styles from "./ProjectCard.module.css";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({
  initials = "",
  title = "",
  fileCount = "",
  lastEdited = "",
  id = "",
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleNavigate}>
      <div className={styles.iconBox}>{initials.toLocaleUpperCase()}</div>
      <div className={styles.projectInfo}>
        <h4 className={styles.projectTitle}>{title}</h4>
        <p className={styles.fileCount}>{fileCount} Files</p>
        <p className={styles.lastEdited}>Last edited on {lastEdited}</p>
      </div>
    </div>
  );
};
