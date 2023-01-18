import React, { useState, useEffect } from "react";
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Login : Ilara Pharmacy";
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Perform login logic here
    console.log(email, password);

    // Send request to Django API
    axios
      .post("auth/login/", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        // Handle successful login
      })
      .catch((error) => {
        console.log(error);
        // Handle login error
      });
  }

  return (
    <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium mb-4">Log in</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
