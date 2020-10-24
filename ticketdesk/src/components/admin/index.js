import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../shared/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
const Admin = () => {
  const users = useSelector((state) => state.User.users);

  return (
    <div className="admin">
      <h1>Admin</h1>
      <div>
        <div className="admin_card">
          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div key={user.id} className="admin_user_card">
                  <div className="admin_name">
                    <p>
                      <strong>Name: </strong>
                      {user.first_name} {user.last_name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {user.email}
                    </p>
                  </div>
                  <div className="admin_person">
                    <div>
                      <strong>Admin: </strong>
                      {<input checked={user.admin} type="checkbox"></input>}
                    </div>
                    <div>
                      <div>
                        <strong>User Tickets </strong>
                        <Modal
                          userName={`${user.first_name} ${user.last_name}`}
                          data="user"
                          id={user.id}
                          icon={faAddressCard}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <strong>Assigned Tickets </strong>
                        <Modal
                          data="assigned"
                          id={user.id}
                          userName={`${user.first_name} ${user.last_name}`}
                          icon={faTicketAlt}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
