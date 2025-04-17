import React, { useState } from "react";
import styles from "./Projects.module.css";
import { Modal, Button } from "react-bootstrap";
import { ProjectCard } from "./Components/ProjectCard/ProjectCard";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
  const [projects, setProjects] = useState([{}]);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744879078/ques/QuesLogo_1_1_fhzpcw.png"
          alt="Ques.AI Logo"
          className={styles.logo}
          d
        />
        <div className={styles.icons}>
          <img
            src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744879162/ques/settings_logo_jcsbvw.png"
            alt="Settings"
          />
          <img
            src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744879161/ques/notifications_pwfbjv.png"
            alt="Notifications"
          />
        </div>
      </header>
      {/* Modal */}
      {/* Modal itself */}
      <Modal show={openModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%" }}>
            <p>Enter your project name:</p>
            <input type="text" className={styles.input} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => alert("Project Created")}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {projects.length == 0 && (
        // add new project
        <div className={styles.main}>
          <h1 className={styles.title}>Create a New Project</h1>
          <img
            src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744879229/ques/Group_16_t0a1p8.png"
            alt="Illustration"
            className={styles.illustration}
          />
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button className={styles.createButton} onClick={handleOpenModal}>
            <span>➕</span> Create New Project
          </button>
          {/* Modal itself */}
          {/* <Modal show={openModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Create Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ width: "100%" }}>
                <p>Enter your project name:</p>
                <input type="text" className={styles.input} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => alert("Project Created")}
              >
                Create
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      )}
      {projects.length > 0 && (
        <div className={styles.main}>
          {/* Navbar */}
          <div className={styles.projectsNavbar}>
            <div className={styles.projectsHeader}>
              <h2>Projects</h2>
            </div>
            <div>
              <button
                className={styles.addNewProjectBtn}
                onClick={handleOpenModal}
              >
                <span>
                  <img
                    src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744893857/ques/plus_fvqwxa.png"
                    alt=""
                    className={styles.addNewProjectBtnLogo}
                  />
                </span>
                <span>Create New Project</span>
              </button>
            </div>
          </div>
          {/* Project list */}
          <div
            className={styles.projectsGridContainer}
            // style={{
            //   width: "95%",
            //   marginTop: "1em",
            //   margin: "auto",
            //   display: "grid",
            // }}
          >
            {projects.map((item, key) => {
              return <ProjectCard />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
