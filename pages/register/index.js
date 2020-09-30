import React, { useState } from 'react';

const Register = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(``, credentials)
      .then(res => {

      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;