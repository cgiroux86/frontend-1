import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../shared/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt, faAddressCard } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const users = useSelector((state) => state.User.users);

  return (
    <div className="admin">
      <Navbar />

      <h1>Admin</h1>
      <div>
        <div className="admin_card">
          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <div className="admin_user_card">
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
                    <p>
                      <strong>Admin: </strong>
                      {<input checked={user.admin} type="checkbox"></input>}
                    </p>
                    <p>
                      <strong>User Tickets </strong>
                      <FontAwesomeIcon
                        className="admin_icon"
                        icon={faAddressCard}
                      />
                    </p>

                    <p>
                      <strong>Assigned Tickets </strong>
                      <FontAwesomeIcon
                        className="admin_icon"
                        icon={faTicketAlt}
                      />
                    </p>
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
