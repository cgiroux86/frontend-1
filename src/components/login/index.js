import React, { useState } from 'react';

const Login = (props) => {

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
    <div className="login">
      <form onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;