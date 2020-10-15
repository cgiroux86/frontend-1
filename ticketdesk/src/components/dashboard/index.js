import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Expansion from "./Expansion";
import NavBar from "../shared/NavBar";
import Card from "./Card";
import TicketInfo from "./TicketInfo";
import CreateTicket from "./CreateTicket";
import { useRecoilState } from "recoil";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { ticketState } from "../../recoil/ticketState";
import Alert from "./Alert";
import { formatDate } from "../../utils/formatDate";

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
      font-size: 1.5rem;
    }

    .main {
      h2 {
        padding: 0 0 0 5%;
        font-size: 1.5rem;
        border: 1px solid red;
        margin: 5% 0;
      }

      .active {
        background: lightblue;
        border-left: 4px solid blue;
      }

      .main_button {
        margin: 5% 0;
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

const Dashboard = () => {
  const [active, setActive] = useState({
    all: true,
    my: false,
  });

  const [data, setData] = useRecoilState(ticketState);

  // const [user, setUser] = useRecoilState(userState);
  // const [responses, setResponses] = useRecoilState(ticketState);
  const [success, setSuccess] = useState(false);

  const [selectedTicket] = useState([]);
  const fetchData = () => {
    axiosWithAuth()
      .get("/tickets/all")
      .then((res) =>
        setData({ ...data, tickets: res.data, selected: res.data[0] })
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

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
          <div style={{ height: "100%" }}>
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
            </div>
          </div>
          <CreateTicket setSuccess={setSuccess} fetchData={fetchData} />
        </div>
        <div className="middle">
          <div
            style={{
              width: "80%",
              margin: "0 auto",
              position: "relative",
              right: "13%",
              top: "1%",
            }}
            className={success ? "alert" : "dont_show"}
          >
            <Alert setSuccess={setSuccess} />
          </div>
          {data.tickets.length &&
            data.tickets.map((item) => {
              return (
                <Card
                  fetchData={fetchData}
                  id={item.ticket_id}
                  key={Math.floor(Math.random() * 10000)}
                  info={item}
                />
              );
            })}
        </div>
        <div className="main_right">
          {data.tickets.length && (
            <TicketInfo ticket={selectedTicket || data.tickets[0]} id={1} />
          )}
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
