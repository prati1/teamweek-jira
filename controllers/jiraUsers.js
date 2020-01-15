const request = require("request");
exports.listUserIssues = (req, res) => {
  let searchUrl = req._parsedUrl.search;
  console.log(searchUrl, "searchUrl");
  request(
    {
      method: "GET",
      url: "https://blinqed.atlassian.net/rest/api/2/search" + searchUrl,
      auth: {
        username: "Your Username",
        password: "Your JIRA auth token"
      },
      headers: {
        Accept: "application/json"
      }
    },
    (err, response, body) => {
      // res.setHeader("Access-Control-Allow-Origin", "*");
      // res.setHeader("Access-Control-Allow-Credentials", true);
      // res.setHeader(
      //   "Access-Control-Allow-Headers",
      //   "Origin, X-Requested-With, Content-Type, Accept"
      // );
      // res.setHeader(
      //   "Access-Control-Allow-Methods",
      //   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      // );

      res.json({
        data: body,
        statusCode: "200"
      });
    }
  );
};

exports.listBoardUsers = (req, res) => {
  console.log(req.query);
  const searchUrl = req.query.project;
  request(
    {
      method: "GET",
      url:
        "https://blinqed.atlassian.net/rest/api/2/user/assignable/search?project=" +
        searchUrl,
      auth: {
        username: "Your Username",
        password: "Your JIRA auth token"
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
