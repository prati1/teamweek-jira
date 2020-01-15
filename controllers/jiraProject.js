const request = require("request");
exports.listProjects = (req, res) => {
  request(
    {
      method: "GET",
      url: "https://blinqed.atlassian.net/rest/api/2/project",
      auth: {
        username: "Your username",
        password: "Your JIRA auth"
      },
      headers: {
        Accept: "application/json"
      }
    },
    (err, response, body) => {
      res.json({
        data: body,
        statusCode: "200"
      });
    }
  );
};
