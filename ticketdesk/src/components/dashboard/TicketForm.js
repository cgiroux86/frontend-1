import React from "react";
import { useForm } from "react-hook-form";
import axiosWithAuth from "../../utils/axiosWithAuth";

export default function TicketForm({ setSuccess, setOpen, fetchData }) {
  const { handleSubmit, register, errors } = useForm();

  //   //
  //     "description": "So that's that",
  //     "attempted_solutions": "Create support ticket",
  //     "submitted_by": 1,
  //     "assigned_to": 3
  //   //

  const onSubmit = (values) => {
    axiosWithAuth()
      .post("/tickets", values)
      .then((res) => {
        setOpen(false);
        fetchData();
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Ticket</h2>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          ref={register({
            required: "Required",
          })}
        />
      </div>
      {errors.description && errors.description.message}
      <div>
        <label htmlFor="attempted_solutions">Attempted Solutions</label>
        <textarea
          name="attempted_solutions"
          ref={register({
            required: "Required",
          })}
        />
      </div>
      {errors.attempted_solutions && errors.attempted_solutions.message}
      <div>
        <label htmlFor="more_info">More info?</label>
        <textarea
          name="more_info"
          ref={register({
            required: "Required",
          })}
        />
      </div>
      {errors.more_info && errors.more_info.message}
      <button type="submit">Submit Ticket</button>
    </form>
  );
}
