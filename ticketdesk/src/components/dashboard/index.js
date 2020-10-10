import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import Expansion from "./Expansion";
import NavBar from "../shared/NavBar";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  .left {
    height: 100%;
    width: 15%;
    background: white;
    display: flex;
    flex-direction: column;

    .nav_header {
      padding: 0 0 0 5%;
    }

    .main {
      h2 {
        padding: 0 0 0 5%;
      }

      .active {
        background: lightblue;
        border-left: 4px solid blue;
      }

      .main_button {
      }
    }

    .filters {
      padding: 0 0 0 5%;
      display: flex;
      flex-direction: column;

      select {
        margin: 4px 0;
        border: none;
      }

      .bottom_filter {
      }
    }
  }

  .middle {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .card {
      width: 50%;
      margin: 2%;
      height: 100px;
      background: white;
      border-radius: 5px;
      box-shadow: 2px 2px 2px 2px lightgrey;
      display: flex;

      .left {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          font-size: 1.2rem;
          text-align: center;
          margin: 0;
        }
      }

      .middle {
        width: 70%;
        height: 100%;

        h2 {
          margin: 0;
          padding: 0;
          border: none;
        }

        p {
          margin: 0;
          padding: 0;
          border: none;
        }
      }

      .right {
        width: 15%;
        height: 100%;
        border: none;

        p {
        }
      }
    }
  }

  .right {
    height: 100%;
    width: 25%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;

    .circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: white;
      }
    }
  }
`;

const Dashboard = () => {
  const [active, setActive] = useState({
    all: true,
    my: false,
  });

  const choose = (e) => {
    console.log("e.target: ", e.target.id);
    if (e.target.id == "all") {
      setActive({
        all: true,
        my: false,
      });
    } else if (e.target.id == "my") {
      setActive({
        all: false,
        my: true,
      });
    }
  };

  const data = [
    {
      age: 4,
      title: "People Problem",
      description: "I got a people problem",
      assigned_to: "Chris Giroux",
    },
    {
      age: 4,
      title: "People Problem",
      description: "I got a people problem",
      assigned_to: "Brandon Teague",
    },
    {
      age: 4,
      title: "People Problem",
      description: "I got a people problem",
      assigned_to: "Scott Harris",
    },
    {
      age: 4,
      title: "People Problem",
      description: "I got a people problem",
      assigned_to: "Joe Schmoe",
    },
    {
      age: 4,
      title: "People Problem",
      description: "I got a people problem",
      //   assigned_to: "Jana Scheuble",
    },
  ];
  return (
    <>
      <NavBar />
      <Container>
        <div className="left">
          <div className="nav_header">
            <h1>The Queue</h1>
          </div>
          <div className="main">
            <div className={active.all ? "active" : "main_button"}>
              <h2 onClick={(e) => choose(e)} id="all">
                All Tickets
              </h2>
            </div>
            <div className={active.my ? "active" : "main_button"}>
              <h2 onClick={choose} id="my">
                My Tickets
              </h2>
            </div>
          </div>
          <div className="filters">
            <h3></h3>
            <Expansion />
            {/* <select>
            <option>Filtered Tickets</option>
            <option>Filtered Tickets</option>
            <option>Filtered Tickets</option>
            <option>Filtered Tickets</option>
          </select>
          <select>
            <option>Categories</option>
            <option>Categories</option>
            <option>Categories</option>
            <option>Categories</option>
          </select>
          <select>
            <option>Status</option>
            <option>Status</option>
            <option>Status</option>
            <option>Status</option>
          </select>
          <select>
            <option>Assigned To</option>
            <option>Assigned To</option>
            <option>Assigned To</option>
            <option>Assigned To</option>
          </select>
          <select>
            <option>Urgency</option>
            <option>Urgency</option>
            <option>Urgency</option>
            <option>Urgency</option>
          </select>
          <h3></h3>
          <h3></h3>
          <h3></h3>
          <h3></h3> */}
            <div className="bottom_filter">
              <h3>Sort Tickets</h3>
            </div>
          </div>
        </div>
        <div className="middle">
          {data.map((i, index) => {
            return (
              <div className="card">
                <div className="left">
                  <p>
                    {i.age}
                    <br />
                    days
                    <br />
                    old
                  </p>
                </div>
                <div className="middle">
                  <h2>{i.title}</h2>
                  <p>{i.description}</p>
                </div>
                <div className="right">
                  {i.assigned_to && (
                    <div>
                      <Avatar
                        style={{ color: "white", fontWeight: "bold" }}
                        src={i.image}
                      >{`${i.assigned_to.split(" ")[0][0]}${
                        i.assigned_to.split(" ")[1][0]
                      }`}</Avatar>
                      {/* <p>{i.assigned_to}</p> */}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="right"></div>
      </Container>
    </>
  );
};

export default Dashboard;
