import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/personDetails.css";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Card from 'react-bootstrap/Card';

function PersonDetails() {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [postsData, setPostsData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const dateObject = new Date(currentTime);
  const history = useHistory();

  useEffect(() => {
    axios("http://worldtimeapi.org/api/timezone").then((result) => {
      setCountryData(result.data);
    });
    axios("https://jsonplaceholder.typicode.com/posts").then((result) => {
      setPostsData(result.data);
    });
  }, []);


  useEffect(() => {
    console.log("neha", currentTime)
    setCurrentTime(currentTime?.datetime)
  },[selectedCountry,currentTime ])
  
  const countrySelector = (data) => {
    const county = data.split("/")[1];
    setSelectedCountry(county);
    axios(`http://worldtimeapi.org/api/timezone/${data}`).then((result) => {
      setCurrentTime(result?.data);
    });
  }
  const backHandler = () => {
    history.goBack();
  }
  return (
    <div className="card-details-wrapper">
      <div className="card-details">
        <div className="card-header">
          <div className="left-header">
            <Button onClick={backHandler}>Back</Button>
          </div>
          <div className="right-header">
            <Dropdown className="right-header-ele">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedCountry ? selectedCountry : " Country Dropdown"}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-item-ele">
              {countryData?.map((data) => {
                return (
                  <Dropdown.Item onClick={() => countrySelector(data)} >{data.split("/")[1]}</Dropdown.Item>
                )
              })}
              </Dropdown.Menu>
            </Dropdown >
            <Badge className="right-header-ele" bg="secondary">New</Badge>
            <Button  className="right-header-ele">Start/Pause</Button>
          </div>
        </div>
        <div className="post-div">
              {postsData?.map((data) => {
                return(
                  <Card >
                  <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <Card.Text>
                      {data?.body}
                    </Card.Text>
                  </Card.Body>
                </Card>
                )
              })}
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;
