import React, { useState, useEffect } from "react";
import Expansion from "./Expansion";
import NavBar from "../shared/NavBar";
import Card from "./Card";
import TicketInfo from "./TicketInfo";
import CreateTicket from "./CreateTicket";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert";
import {
  fetchAllTickets,
  setSelectedTicket,
} from "../../redux/actions/ticketActions";
import { setAllUsers } from "../../redux/actions/userActions";

const Dashboard = () => {
  const [active, setActive] = useState({
    all: true,
    my: false,
  });

  const [success, setSuccess] = useState(false);
  const [selectedTicket] = useState([]);
  const data = useSelector((state) => state.Tickets);
  const dispatch = useDispatch();

  const fetchData = () => {
    axiosWithAuth()
      .get("/tickets/all")
      .then((res) => {
        dispatch(fetchAllTickets(res.data));
        dispatch(setSelectedTicket(res.data[0]));
      })

      .catch((err) => console.log(err));
  };

  const fetchUsers = () => {
    axiosWithAuth()
      .get("/users")
      .then((res) => {
        dispatch(setAllUsers(res.data));
      });
  };

  useEffect(() => {
    fetchData();
    fetchUsers();
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
      <div className="dashboard_section_container">
        <div className="left">
          <div className="main_left_container">
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
          {data &&
            data.tickets.length > 0 &&
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
          {data.tickets.length > 0 && (
            <TicketInfo ticket={selectedTicket || data.tickets[0]} id={1} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
