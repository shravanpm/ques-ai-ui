import React, { useContext, useEffect, useState } from "react";
import styles from "./ProjectDetails.module.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../../config/config";
import { UserContext } from "../../Context/UserContext/UserContext";
import { extractDateAndTime } from "../../utils/utils";

export const ProjectDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [uploadModalTitle, setUploadModalTitle] = useState({
    image: "",
    header: "",
  });
  const [files, setFiles] = useState([]);
  const [leftSectionOptions, setLeftSectionOptions] = useState([
    {
      title: "Add your Podcast(s)",
      img: "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904596/ques/plus_vaydj5.png",
      alt: "Add",
    },
    {
      title: "Create & Repurpose",
      img: "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904595/ques/create_tcvnth.png",
      alt: "edit",
    },
    {
      title: "Podcast & Widgets ",
      img: "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904594/ques/podcast_pr8trj.png",
      alt: "Podcast",
    },
    {
      title: "Upgrade",
      img: "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904593/ques/diamond_cdj4sy.png",
      alt: "Upgrade",
    },
  ]);

  const { userAuth } = useContext(UserContext);
  console.log({ userAuth });

  const { projectId } = useParams();

  const navigate = useNavigate();

  const [activeOption, setActiveOption] = useState(0);
  const [file, setFile] = useState({ name: "", transcript: "" });
  const [projectName, setProjectName] = useState("");
  const [editTranscript, setEditTranscript] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [activateEdit, setActivateEdit] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setUploadModalTitle({ image: "", header: "" });
  };
  const handleOpenModal = (header, image) => {
    setOpenModal(true);
    setUploadModalTitle({ header, image });
  };

  const getFilesByProjectId = async () => {
    try {
      const { data } = await axios({
        url: `${config.base_url}/file/project/${projectId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${userAuth.token}` },
      });
      console.log({ filesData: data });

      setFiles(JSON.parse(JSON.stringify(data.files)));
    } catch (error) {
      // TODO
    }
  };

  const getProjectData = async () => {
    try {
      const { data } = await axios({
        url: `${config.base_url}/project/${projectId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${userAuth.token}` },
      });
      console.log({ projectData: data });

      setProjectName(data.project.name);
    } catch (error) {
      // TODO
    }
  };
  const handleFileData = (e) => {
    const { name, value } = e.target;
    setFile({ ...file, [name]: value });
  };

  const handleChangeOnSelectedFile = (e) => {
    const { name, value } = e.target;
    setSelectedFile({ ...selectedFile, [name]: value });
  };

  const handleCreateFile = async () => {
    try {
      file.project = projectId;
      const { data } = await axios({
        url: `${config.base_url}/file`,
        data: file,
        method: "POST",
        headers: { Authorization: `Bearer ${userAuth.token}` },
      });
      await getFilesByProjectId();
    } catch (error) {
      // TODO
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      file.project = projectId;
      const { data } = await axios({
        url: `${config.base_url}/file/${file._id}`,
        data: file,
        method: "DELETE",
        headers: { Authorization: `Bearer ${userAuth.token}` },
      });
      await getFilesByProjectId();
    } catch (error) {
      // TODO
    }
  };

  const handleEditFile = async () => {
    try {
      const { data } = await axios({
        url: `${config.base_url}/file/${selectedFile._id}`,
        method: "PATCH",
        headers: { Authorization: `Bearer ${userAuth.token}` },
        data: {
          transcript: selectedFile.transcript,
        },
      });
      await getFilesByProjectId();
    } catch (error) {
      // TODO
    }
  };

  const handleSelectedFile = (file) => {
    setSelectedFile(file);
    setEditTranscript(!editTranscript);
  };

  useEffect(() => {
    (async function () {
      await getFilesByProjectId();
      await getProjectData();
    })();
  }, []);

  return (
    <div className={styles.container}>
      {/* Left section */}
      <section className={styles.leftSection}>
        <div>
          <div className={styles.header}>
            <img
              src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744879078/ques/QuesLogo_1_1_fhzpcw.png"
              alt="Ques.AI Logo"
              className={styles.logo}
            />
          </div>

          <div style={{ marginTop: "5px" }}>
            {/* Left section options */}
            {leftSectionOptions.map((item, index) => {
              return (
                <div
                  className={`${styles.leftSectionOption} ${
                    activeOption === index ? styles.activeOption : ""
                  }`}
                  key={index}
                  onClick={() => setActiveOption(index)}
                >
                  <span className={styles.icons}>
                    <img src={item.img} alt={item.alt} />
                  </span>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Footer */}
        <div>
          <div className={styles.leftSectionOption}>
            <span className={styles.icons}>
              <img
                src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744879162/ques/settings_logo_jcsbvw.png"
                alt="Help"
              />
            </span>
            <p>Help</p>
          </div>
          <div className={styles.lineBreak}></div>
          <div>
            <div className={styles.leftSectionOption}>
              <span className={styles.userIcons}>
                <img
                  src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744905697/ques/Rectangle_89_tec95v.png"
                  alt="Username"
                />
              </span>
              <div>
                <p className={styles.userName}>
                  {userAuth.user.email.split("@")[0]}
                </p>
                <span className={styles.email}>{userAuth.user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Right section */}
      <section className={styles.rightSection}>
        {/* Navbar */}
        <div className={styles.rightSectionNavbar}>
          <span>
            <img
              src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910566/ques/home_otbxhi.png"
              alt="home"
            />
          </span>
          <span>
            <span>Home Page</span> /{" "}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/projects`);
              }}
            >
              {projectName}
            </span>{" "}
            /{" "}
          </span>
          <span className={styles.current}>
            {leftSectionOptions[activeOption].title}
          </span>
        </div>

        <section>
          <h2 className={styles.title}>
            {editTranscript ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <span>
                    <img
                      src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744973824/ep_back_aick3t.png"
                      alt=""
                      style={{
                        height: "30px",
                        marginTop: "-3px",
                        marginRight: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditTranscript(false);
                      }}
                    />
                  </span>
                  <span>Edit Transcript</span>
                </span>
                {activateEdit ? (
                  <span>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setActivateEdit(false);
                        setEditTranscript(false);
                      }}
                      style={{
                        backgroundColor: "white",
                        color: "red",
                        marginRight: "20px",
                      }}
                    >
                      Discard
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => {
                        setActivateEdit(false);
                        setEditTranscript(false);
                        handleEditFile();
                      }}
                      style={{ backgroundColor: "#211935" }}
                    >
                      Save
                    </Button>
                  </span>
                ) : (
                  <span>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setActivateEdit(true);
                      }}
                      style={{ backgroundColor: "#211935" }}
                    >
                      Edit
                    </Button>
                  </span>
                )}
              </div>
            ) : (
              <div>Add Podcast</div>
            )}
          </h2>
          {!editTranscript ? (
            <section>
              {/* Podcast Options */}
              <div className={styles.options}>
                <div
                  className={styles.optionCard}
                  onClick={() =>
                    handleOpenModal(
                      "Upload from RSS Feed",
                      "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910789/ques/rss_feed_snie6h.png"
                    )
                  }
                >
                  <img
                    src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910789/ques/rss_feed_snie6h.png"
                    alt="RSS Feed"
                  />
                  <div>
                    <h5>RSS Feed</h5>
                    <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
                  </div>
                </div>

                <div
                  className={styles.optionCard}
                  onClick={() =>
                    handleOpenModal(
                      "Upload from YouTube",
                      "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910787/ques/youtube_oyjpgl.png"
                    )
                  }
                >
                  <img
                    src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910787/ques/youtube_oyjpgl.png"
                    alt="YouTube"
                  />
                  <div>
                    <h5>Youtube Video</h5>
                    <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
                  </div>
                </div>

                <div
                  className={styles.optionCard}
                  onClick={() =>
                    handleOpenModal(
                      "Upload file",
                      "https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910786/ques/upload_yuexf0.png"
                    )
                  }
                >
                  <img
                    src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910786/ques/upload_yuexf0.png"
                    alt="Upload Files"
                  />
                  <div>
                    <h5>Upload Files</h5>
                    <p>Lorem ipsum dolor sit. Dolor lorem sit.</p>
                  </div>
                </div>
              </div>

              {/* File Upload Section */}
              {files.length === 0 && (
                <div className={styles.uploadBox}>
                  <img
                    src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910938/ques/cloud_upload_acksnf.png"
                    alt="Upload"
                    className={styles.uploadIcon}
                  />
                  <p>
                    Select a file or drag and drop here (Podcast Media or
                    Transcription Text)
                  </p>
                  <p className={styles.fileFormats}>
                    MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
                  </p>
                  <button className={styles.selectBtn}>Select File</button>
                </div>
              )}
              {files.length > 0 && (
                <section className={`${styles.filesList}`}>
                  <h6>Your Files</h6>
                  <table className={styles.fileTable}>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Upload Date & Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file, index) => {
                        const { date, time } = extractDateAndTime(
                          file.updatedAt
                        );
                        return (
                          <tr key={file.id}>
                            <td>{index + 1}</td>
                            <td>{file.name}</td>
                            <td>
                              {date} | {time}
                            </td>
                            <td className={styles.actionButtons}>
                              <button
                                className={styles.viewBtn}
                                onClick={() => handleSelectedFile(file)}
                              >
                                View
                              </button>
                              <button
                                className={styles.deleteBtn}
                                onClick={() => handleDeleteFile(file)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </section>
              )}
            </section>
          ) : (
            <section className={styles.editTranscriptBox}>
              <textarea
                name="transcript"
                id=""
                rows={16}
                value={selectedFile.transcript}
                disabled={!activateEdit}
                onChange={handleChangeOnSelectedFile}
              ></textarea>
            </section>
          )}
        </section>
      </section>
      {/* Modal */}
      <Modal show={openModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={styles.modalTitle}>
              <img
                src={uploadModalTitle.image ? uploadModalTitle.image : ""}
                alt=""
              />
            </span>
            <span style={{ margin: "0px 0px 0px 10px", paddingTop: "5px" }}>
              {uploadModalTitle.header}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ width: "100%" }}>
            <div className={styles.modalBody}>
              <div>Name</div>
              <input
                type="text"
                className={styles.input}
                name="name"
                onChange={handleFileData}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className={styles.modalBody}>
              <div>Transcript</div>
              <textarea
                rows={3}
                className={styles.input}
                name="transcript"
                onChange={handleFileData}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCreateFile();
              handleCloseModal();
            }}
            style={{ backgroundColor: "#211935" }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </div>
  );
};
