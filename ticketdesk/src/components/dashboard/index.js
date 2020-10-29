import React, { useState, useEffect } from "react";
import Expansion from "./Expansion";
import NavBar from "../shared/NavBar";
import Card from "./Card";
import TicketInfo from "./TicketInfo";
import CreateTicket from "./CreateTicket";
import TicketForm from "./TicketForm";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert";
import {
  fetchAllTickets,
  setSelectedTicket,
} from "../../redux/actions/ticketActions";
import { setAdminView, setAllUsers } from "../../redux/actions/userActions";
import Admin from "../admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUsers,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import CompanyInfo from "../admin/CompanyInfo";
import MobileMain from "./MobileMain";
import TabletMain from "./TabletMain";

const Dashboard = () => {
  const [active, setActive] = useState({
    all: true,
    my: false,
  });

  const [success, setSuccess] = useState(false);
  const [selectedTicket] = useState([]);
  const [showCompanyInfo, setShowCompanyInfo] = useState(true);
  const data = useSelector((state) => state.Tickets);
  const user = useSelector((state) => state.User);
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

  const changeAdminView = () => {
    dispatch(setAdminView(!user.is_admin_view));
  };

  const handleCompanyInfoChange = () => {
    setShowCompanyInfo(!showCompanyInfo);
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      {!user.is_admin_view ? (
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
              <div className="side_nav_buttons">
                <div className="create_button">
                  <CreateTicket setSuccess={setSuccess} fetchData={fetchData} />
                </div>
                {user.admin && (
                  <div onClick={changeAdminView} className="admin_button">
                    <FontAwesomeIcon icon={faUsers} />
                    <p>Admin Dashboard</p>
                  </div>
                )}
              </div>
            </div>
            <div className="key_indicators">
              <div className="status_indicator_container">
                <h4>Status</h4>
                <div className="indicator_item_container">
                  <div className="priority_container">
                    <div className="no_priority"></div>
                    <p>Not Started</p>
                  </div>
                  <div className="priority_container">
                    <div className="medium_priority"></div>
                    <p>In Progress</p>
                  </div>
                  <div className="priority_container">
                    <div className="low_priority"></div>
                    <p>Complete</p>
                  </div>
                </div>
              </div>
              <div className="status_indicator_container">
                <h4>Priority</h4>
                <div className="indicator_item_container">
                  <div className="priority_container">
                    <div className="no_priority"></div>
                    <p>No Priority</p>
                  </div>
                  <div className="priority_container">
                    <div className="low_priority"></div>
                    <p>Low</p>
                  </div>
                  <div className="priority_container">
                    <div className="medium_priority"></div>
                    <p>Medium</p>
                  </div>
                  <div className="priority_container">
                    <div className="high_priority"></div>
                    <p>High</p>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="mobile_container">
              <MobileMain
                active={active}
                setActive={setActive}
                setSuccess={setSuccess}
                fetchData={fetchData}
              />
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
          <div className="tablet_main">
            <TabletMain
              fetchData={fetchData}
              active={active}
              setActive={setActive}
              choose={choose}
            />
          </div>
        </div>
      ) : (
        <div className="dashboard_section_container">
          <div className="admin_left">
            <div className="main_left_container">
              <div className="nav_header">
                <h1>Admin</h1>
              </div>
              <div className="main">
                <div
                  onClick={handleCompanyInfoChange}
                  className={active.all ? "active" : "main_button"}
                >
                  <h2 onClick={choose} id="all">
                    Company Info
                  </h2>
                </div>
                <div
                  onClick={handleCompanyInfoChange}
                  className={active.my ? "active" : "main_button"}
                >
                  <h2 onClick={choose} id="my">
                    User Info
                  </h2>
                </div>
                <div className="switch_admin_view" onClick={changeAdminView}>
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                  <p>User Dashboard</p>
                </div>
              </div>
            </div>
          </div>
          <div className="admin_middle">
            {showCompanyInfo ? <CompanyInfo /> : <Admin />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
