import React, { useState } from "react";
import styles from "./UploadPage.module.css";
import { Modal, Button } from "react-bootstrap";

export const UploadPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [uploadModalTitle, setUploadModalTitle] = useState({
    image: "",
    header: "",
  });
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "THE SIDEPOD S2 EPISODE 15",
      date: "25 Oct 23",
      time: "09:04",
    },
    {
      id: 2,
      name: "THE SIDEPOD S2 EPISODE 17",
      date: "27 Oct 23",
      time: "11:08",
    },
    {
      id: 3,
      name: "THE SIDEPOD S2 EPISODE 20",
      date: "31 Oct 23",
      time: "20:28",
    },
    {
      id: 4,
      name: "THE SIDEPOD S2 EPISODE 20",
      date: "31 Oct 23",
      time: "20:28",
    },
  ]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setUploadModalTitle({ image: "", header: "" });
  };
  const handleOpenModal = (header, image) => {
    setOpenModal(true);
    setUploadModalTitle({ header, image });
  };
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
              d
            />
          </div>

          <div style={{ marginTop: "5px" }}>
            <div className={styles.leftSectionOption}>
              <span className={styles.icons}>
                <img
                  src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904596/ques/plus_vaydj5.png"
                  alt="Add"
                />
              </span>
              <p>Add your Podcast(s)</p>
            </div>

            <div className={styles.leftSectionOption}>
              <span className={styles.icons}>
                <img
                  src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904595/ques/create_tcvnth.png"
                  alt="edit"
                />
              </span>
              <p>Create & Repurpose</p>
            </div>

            <div className={styles.leftSectionOption}>
              <span className={styles.icons}>
                <img
                  src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904594/ques/podcast_pr8trj.png"
                  alt="podcast"
                />
              </span>
              <p>Podcast Widget</p>
            </div>

            <div className={styles.leftSectionOption}>
              <span className={styles.icons}>
                <img
                  src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744904593/ques/diamond_cdj4sy.png"
                  alt="Upgrade"
                />
              </span>
              <p>Upgrade</p>
            </div>
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
                <p className={styles.userName}>Username</p>
                <span className={styles.email}>email</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Right section */}
      <div className={styles.rightSection}>
        {/* Navbar */}
        <div className={styles.rightSectionNavbar}>
          <span>
            <img
              src="https://res.cloudinary.com/dmpdvpvqt/image/upload/v1744910566/ques/home_otbxhi.png"
              alt="home"
            />
          </span>
          <span>Home Page / Sample Project / </span>
          <span className={styles.current}>Add your podcast</span>
        </div>

        <section></section>
        <h2 className={styles.title}>Add Podcast</h2>

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
                {files.map((file, index) => (
                  <tr key={file.id}>
                    <td>{index + 1}</td>
                    <td>{file.name}</td>
                    <td>
                      {file.date} | {file.time}
                    </td>
                    <td className={styles.actionButtons}>
                      <button className={styles.viewBtn}>View</button>
                      <button className={styles.deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
      {/* Modal */}
      <Modal show={openModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={styles.modalTitle}>
              <img src={uploadModalTitle.image} alt="" />
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
              <input type="text" className={styles.input} />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className={styles.modalBody}>
              <div>Transcript</div>
              <textarea rows={3} className={styles.input} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
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
