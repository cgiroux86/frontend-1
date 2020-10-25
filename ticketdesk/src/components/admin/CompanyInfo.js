import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AxiosWithAuth from "../../utils/axiosWithAuth";
import { fetchAdmins } from "../../redux/actions/userActions";

export default function CompanyInfo() {
  const users = useSelector((state) => state.User.users);
  const admins = useSelector((state) => state.User.admins);
  const tickets = useSelector((state) => state.Tickets.tickets);
  const dispatch = useDispatch();

  const getAllAdmins = () => {
    AxiosWithAuth()
      .get("/users/admins")
      .then((res) => {
        dispatch(fetchAdmins(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <div className="company_info_container">
      {users.length > 0 && tickets.length > 0 && (
        <div className="company_info">
          <div>
            <h2>Total Members: {users.length}</h2>
            <h3>Total Tickets: {tickets.length}</h3>
            <h3>
              Open Tickets:{" "}
              {tickets.filter((ticket) => ticket.status !== "complete").length}
            </h3>
          </div>
          <div>
            <h2>Users</h2>
            {users.length > 0 &&
              users.map((user) => {
                return (
                  <div key={user.id}>
                    Name: {user.first_name} {user.last_name}
                  </div>
                );
              })}
          </div>
          <div>
            <h2>Admins</h2>
            {admins.length > 0 &&
              admins.map((admin) => {
                return (
                  <div key={admin.id}>
                    Name: {admin.first_name} {admin.last_name}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
