import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import Select from "react-select";
import axios from "axios";

const TeamWeekHome = () => {
  let history = useHistory();
  const [projects, setProjects] = useState([]);
  const [value, setValue] = useState("");
  const onChange = e => {
    console.log(e.label);
    setValue(e.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log("handlesubmit", value);
    history.push("/jira-timeline", { key: value });
  };
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:3300/jira-project"
    };
    axios(options)
      .then(res => {
        const jiraProjects = JSON.parse(res.data.data);
        console.log(jiraProjects);
        setProjects(jiraProjects);
      })
      .catch(err => {
        console.log(`err`, err);
      });
  }, []);
  return (
    <Container className="TeamWeekHome">
      <h4>Search your project</h4>
      <form onSubmit={onSubmit}>
        <Select
          options={projects.map(project => ({
            label: project.name,
            value: project.key
          }))}
          onChange={onChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </Container>
  );
};

export default withRouter(TeamWeekHome);
