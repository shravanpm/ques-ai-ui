import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Projects } from "../Pages/Projects/Projects";
import { UploadPage } from "../Pages/UploadPage/UploadPage";

export const AllRoutes = () => {
  return (
    <Routes>
      AllRoutes
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  );
};
