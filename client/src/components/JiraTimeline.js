import React, { Component, useState, useEffect } from "react";
// import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { useLocation } from "react-router-dom";

// import { CSSTransition, TransitionGroup } from "react-transition-group";
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
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col">5</th>
            <th scope="col">6</th>
            <th scope="col">7</th>
            <th scope="col">8</th>
            <th scope="col">9</th>
            <th scope="col">10</th>
            <th scope="col">11</th>
            <th scope="col">12</th>
            <th scope="col">13</th>
            <th scope="col">14</th>
            <th scope="col">15</th>
            <th scope="col">16</th>
            <th scope="col">17</th>
            <th scope="col">18</th>
            <th scope="col">19</th>
            <th scope="col">20</th>
            <th scope="col">21</th>
            <th scope="col">22</th>
            <th scope="col">23</th>
            <th scope="col">24</th>
            <th scope="col">25</th>
            <th scope="col">26</th>
            <th scope="col">27</th>
            <th scope="col">28</th>
            <th scope="col">29</th>
            <th scope="col">30</th>
            <th scope="col">31</th>
            <th scope="col">32</th>
            <th scope="col">33</th>
            <th scope="col">34</th>
            <th scope="col">35</th>
            <th scope="col">36</th>
            <th scope="col">37</th>
            <th scope="col">38</th>
            <th scope="col">39</th>
            <th scope="col">40</th>
            <th scope="col">41</th>
            <th scope="col">42</th>
            <th scope="col">43</th>
            <th scope="col">44</th>
            <th scope="col">45</th>
            <th scope="col">46</th>
            <th scope="col">47</th>
            <th scope="col">48</th>
            <th scope="col">49</th>
            <th scope="col">50</th>
          </tr>
        </thead>
        <tbody>
          {JiraUsers &&
            JiraUsers.length > 0 &&
            JiraUsers.map((item, i) => (
              <tr>
                <UserInfo item={item} />
                <UserIssues
                  userInfo={item.accountId}
                  projectKey={props.projectKey}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    // <Container>
    //   {JiraUsers &&
    //     JiraUsers.length > 0 &&
    //     JiraUsers.map((item, i) => (
    //       <div className="row" issue={item.id} key={i}>
    //         <div className="col-lg-3">
    //           <UserInfo item={item} />
    //         </div>
    //         <div className="col-lg-9">
    //           <UserIssues
    //             userInfo={item.accountId}
    //             projectKey={props.projectKey}
    //           />
    //         </div>
    //       </div>
    //     ))}
    // </Container>
  );
};

const UserInfo = props => {
  return (
    <th scope="row">
      <div className="image-part">
        <img src={props.item.avatarUrls["48x48"]} className="img-fluid" />
      </div>
      <div className="person-name">{props.item.displayName}</div>
    </th>
    // <div className="card">
    //   <img
    //     className="card-img-top"
    //     src={props.item.avatarUrls["48x48"]}
    //     alt="Card image"
    //   />
    //   <div className="card-body">
    //     <h5 className="card-title">{props.item.displayName}</h5>
    //   </div>
    // </div>
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
        assignee: `${props.userInfo}`,
        project: `${props.projectKey}`,
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
      <>
        {JiraIssues.issues &&
          JiraIssues.issues.length > 0 &&
          JiraIssues.issues.map((item, i) => (
            <td
              colSpan="5"
              className="bg-success text-white"
              key={i}
              issue={item.id}
            >
              <div className="issue-details">{item.fields.summary}</div>
              <div className="details">
                <div className="issue-id">{item.key}</div>
                <div className="time">{item.fields.timeoriginalestimate}</div>
              </div>
            </td>
          ))}
      </>
      // <Container>
      //   <div className="row">
      //     {JiraIssues.issues &&
      //       JiraIssues.issues.length > 0 &&
      //       JiraIssues.issues.map((item, i) => (
      //         <div className="col-lg-2" key={i}>
      //           <table issue={item.id}>
      //             <tbody>
      //               <tr>
      //                 <td>{item.key}</td>
      //               </tr>
      //               <tr>
      //                 <td>{item.fields.summary}</td>
      //               </tr>
      //               {/* <tr>
      //                 <td>{item.fields.description}</td>
      //               </tr> */}
      //               <tr priorityid={item.fields.priority.id}>
      //                 <td>{item.fields.priority.name}</td>
      //               </tr>
      //               <tr>
      //                 <td>{item.fields.timeoriginalestimate}</td>
      //               </tr>
      //               <tr>
      //                 <td>{item.fields.timespent}</td>
      //               </tr>
      //             </tbody>
      //           </table>
      //         </div>
      //       ))}
      //   </div>
      // </Container>
    );
  }
};

export default JiraTimeline;
