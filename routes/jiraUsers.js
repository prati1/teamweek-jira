const express = require("express");
const router = express.Router();

const jiraController = require("../controllers/jiraUsers");

router.route("/").get(jiraController.listUserIssues);
// .post(contactController.create);

router.route("/listUsers").get(jiraController.listBoardUsers);
module.exports = router;
