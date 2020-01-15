import React, { Component, useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { useLocation } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import axios from "axios";

const JiraTimeline = () => {
  const location = useLocation();
  const [key, setKey] = useState("");
  if (location.state && location.state.key && key == "") {
    setKey(location.state.key);
  }
  // console.log("colid", key);
  return <UserSection projectKey={key} />;
};

const UserSection = props => {
  const [JiraUsers, setJiraUsers] = useState([]);
  console.log("projectkey", props.projectKey);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:3300/jira-user/listUsers",
      params: {
        project: props.projectKey
      }
    };
    axios(options)
      .then(res => {
        const JiraUsers = JSON.parse(res.data.data);
        console.log(JiraUsers);
        setJiraUsers(JiraUsers);
      })
      .catch(err => {
        console.log(`err`, err);
      });
  }, []);
  return (
    <Container>
      {JiraUsers &&
        JiraUsers.length > 0 &&
        JiraUsers.map((item, i) => (
          <div className="row" issue={item.id} key={i}>
            <div className="col-lg-3">
              <UserInfo item={item} />
            </div>
            <div className="col-lg-9">
              <UserIssues
                userInfo={item.accountId}
                projectKey={props.projectKey}
              />
            </div>
          </div>
        ))}
    </Container>
  );
};

const UserInfo = props => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={props.item.avatarUrls["48x48"]}
        alt="Card image"
      />
      <div className="card-body">
        <h5 className="card-title">{props.item.displayName}</h5>
      </div>
    </div>
  );
};

const UserIssues = props => {
  const [JiraIssues, setJiraIssues] = useState({});
  useEffect(() => {
    console.log(props);
    const options = {
      method: "GET",
      url: "http://localhost:3300/jira-user",
      params: {
        jql: `assignee=${props.userInfo}`,
        project: `NS`,
        fields: `id,key,summary,description,priority,timespent,timeoriginalestimate`
      }
    };
    axios(options)
      .then(res => {
        const JiraIssues = JSON.parse(res.data.data);
        console.log(JiraIssues);
        setJiraIssues(JiraIssues);
      })
      .catch(err => {
        console.log(`err`, err);
      });
  }, []);

  if (!props) {
    return <div>Currently in development...</div>;
  } else {
    return (
      <Container>
        <div className="row">
          {JiraIssues.issues &&
            JiraIssues.issues.length > 0 &&
            JiraIssues.issues.map((item, i) => (
              <div className="col-lg-2" key={i}>
                <table issue={item.id}>
                  <tbody>
                    <tr>
                      <td>{item.key}</td>
                    </tr>
                    <tr>
                      <td>{item.fields.summary}</td>
                    </tr>
                    {/* <tr>
                      <td>{item.fields.description}</td>
                    </tr> */}
                    <tr priorityid={item.fields.priority.id}>
                      <td>{item.fields.priority.name}</td>
                    </tr>
                    <tr>
                      <td>{item.fields.timeoriginalestimate}</td>
                    </tr>
                    <tr>
                      <td>{item.fields.timespent}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </Container>
    );
  }
};

export default JiraTimeline;
