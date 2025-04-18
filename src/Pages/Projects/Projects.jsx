import React, { useContext, useEffect, useState } from "react";
import styles from "./Projects.module.css";
import { Modal, Button } from "react-bootstrap";
import { ProjectCard } from "./Components/ProjectCard/ProjectCard";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";
import axios from "axios";
import { config } from "../../config/config";
import { convertISOTimeToString } from "../../utils/utils";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { userAuth } = useContext(UserContext);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectName(value);
  };

  const getAllProjects = async () => {
    try {
      const { data } = await axios({
        url: `${config.base_url}/project/files`,
        headers: { Authorization: `Bearer ${userAuth.token}` },
        method: "GET",
      });
      console.log({ projects: data.projects });
      setProjects(data?.projects);
    } catch (error) {
      // TODO
      return error;
    }
  };

  const handleAddProject = async () => {
    try {
      const { data } = await axios({
        url: `${config.base_url}/project`,
        headers: { Authorization: `Bearer ${userAuth.token}` },
        method: "POST",
        data: { name: projectName },
      });
      handleCloseModal();
      await getAllProjects();
    } catch (error) {
      // TODO
      return error;
    }
  };
  useEffect(() => {
    (async function () {
      await getAllProjects();
    })();
    // (async function(getAllProjects()))()
  }, []);
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
            <input
              type="text"
              className={styles.input}
              name="name"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
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
          {/* {
    "_id": "6801e71399c295722c7a1609",
    "name": "test",
    "user": "6801b0710a471ba086302814",
    "createdAt": "2025-04-18T05:45:55.967Z",
    "updatedAt": "2025-04-18T05:45:55.967Z",
    "files": []
} */}
          <div className={styles.projectsGridContainer}>
            {projects.map((item) => {
              return (
                <ProjectCard
                  key={item._id}
                  id={item._id}
                  initials={item?.name?.slice(0, 2)}
                  title={item?.name}
                  fileCount={item?.files?.length}
                  lastEdited={convertISOTimeToString(item?.updatedAt)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
