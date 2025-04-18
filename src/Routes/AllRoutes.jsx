import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Projects } from "../Pages/Projects/Projects";
import { ProjectDetails } from "../Pages/ProjectDetails/ProjectDetails";
import { PrivateRoute } from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      AllRoutes
      <Route path="/" element={<Home />} />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <PrivateRoute>
            <ProjectDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
