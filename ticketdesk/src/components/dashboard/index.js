import React, { useState } from "react";
import styled from "styled-components";
import Expansion from "./Expansion";
import NavBar from "../shared/NavBar";
import Card from "./Card";
import TicketInfo from "./TicketInfo";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;

  .left {
    height: 100vh;
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
    padding-left: 3%;
    flex-direction: column;


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

        p {
        }
      }
    }
  }

  .right {
    height: 100%;
    width: 30%;
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

const data = [
  {
    age: 4,
    title: "People Problem",
    description: "I got a people problem",
    assigned_to: "Chris Giroux",
    attempted_solutions:
      "Apple Genius Bar, clearing cache and reformatting hard drive",
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
    priority: "low",
  },
  {
    age: 4,
    title: "People Problem",
    description: "I got a people problem",
    assigned_to: "Joe Schmoe",
    priority: "high",
  },
  {
    age: 4,
    title: "People Problem",
    description: "I got a people problem",
    //   assigned_to: "Jana Scheuble",
  },
];

const Dashboard = () => {
  const [active, setActive] = useState({
    all: true,
    my: false,
  });

  const [selectedTicket, setSelectedTicket] = useState(data[0]);

  const choose = (e) => {
    if (e.target.id === "all") {
      setActive({
        all: true,
        my: false,
      });
    } else if (e.target.id === "my") {
      setActive({
        all: false,
        my: true,
      });
    }
  };

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
              <h2 onClick={choose} id="all">
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
            <Expansion />
            <div className="bottom_filter"></div>
          </div>
        </div>
        <div className="middle">
          {data.map((item) => {
            return <Card key={Math.floor(Math.random() * 10000)} info={item} />;
          })}
        </div>
        <div className="main_right">
          <TicketInfo ticket={selectedTicket} id={1} />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
