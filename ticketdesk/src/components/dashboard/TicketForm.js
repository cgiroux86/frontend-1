import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosWithAuth from "../../utils/axiosWithAuth";

export default function TicketForm({ setOpen, fetchData }) {
  const { handleSubmit, register, errors } = useForm();

  const [formInputs, setFormInputs] = useState({});

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
        console.log(res);
        setOpen(false);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="description"
        ref={register({
          required: "Required",
        })}
      />
      {errors.description && errors.description.message}

      <input
        name="attempted_solutions"
        ref={register({
          required: "Required",
        })}
      />
      {errors.username && errors.username.message}

      <button type="submit">Submit</button>
    </form>
  );
}
