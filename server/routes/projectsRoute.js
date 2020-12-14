const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectsController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Crea Projectos
//api/projects
router.post(
  "/",
  auth,
  [check("projectName", "Project Name is required").not().isEmpty()],
  projectController.createProject
);

//Obtener todos los proyectos
router.get("/", auth, projectController.getUserProjects);

//Actualizar proyecto por ID
router.put(
  "/:id",

  auth,
  [check("projectName", "Project Name is required").not().isEmpty()],

  projectController.updateProject
);

module.exports = router;
