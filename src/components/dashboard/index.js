import React from 'react';
import TicketCard from '../../page_components/home/ticket-card';

const Dashboard = (props) => {

  const data = [
    {
      description: '',
      attepmted_solutions: '',
      submitted_by: '',
      priority_id: '',
      assigned_to: '',
      status: '',
      dept_id: 1
    },
    {
      description: '',
      attepmted_solutions: '',
      submitted_by: '',
      priority_id: '',
      assigned_to: '',
      status: '',
      dept_id: 1
    },
    {
      description: '',
      attepmted_solutions: '',
      submitted_by: '',
      priority_id: '',
      assigned_to: '',
      status: '',
      dept_id: 1
    },
    {
      description: '',
      attepmted_solutions: '',
      submitted_by: '',
      priority_id: '',
      assigned_to: '',
      status: '',
      dept_id: 1
    },
  ]
  return (
    <div className="home">
      <section className="menu">

      </section>
      <section className="tickets">
        {data.map(ticket => {
          return (
            <TicketCard ticket={ticket} />
          )
        })}
      </section>
      <section className="current_card">

      </section>
    </div>
  );
}

export default Dashboard;