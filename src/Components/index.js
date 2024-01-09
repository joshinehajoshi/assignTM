import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css";
import { useHistory } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users").then((result) => {
      setUserData(result.data);
    });
  }, []);
  const detailsHandler = (data) => {
    // history("/person-details");
    // history.push(`/person-details/id=${id}`);
    window.location.href = `/person-details/id=${data.id}`
  }
  return (
    <>
      <h2 className="home-title">Directory</h2>
      <div className="home-data-wrapper">
        {userData &&
          userData?.map((data) => {
            return (
              <div className="home-card" onClick={() => detailsHandler(data)}>
                <h3>Name: {data.name}</h3>
                <h3>Posts: 12 Posts</h3>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
