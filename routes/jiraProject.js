const express = require("express");
const router = express.Router();

const projectController = require("../controllers/jiraProject");

router.route("/").get(projectController.listProjects);

// router.route("/listUsers").get(projectController.listBoardUsers);
module.exports = router;
