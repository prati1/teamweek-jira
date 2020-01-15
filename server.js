let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");

const jiraUsers = require("./routes/jiraUsers");
const jiraProject = require("./routes/jiraProject");

app.use(cors({ origin: "http://localhost:3000" }));
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Setup server port
let port = process.env.PORT || 3300;
// Launch app to listen to specified port
app.listen(port, function() {
  console.log("Running tleamweekAPI on port " + port);
});

app.use("/jira-user", jiraUsers);
app.use("/jira-project", jiraProject)

module.exports = app;
