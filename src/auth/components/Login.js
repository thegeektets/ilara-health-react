import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // Perform login logic here
    console.log(email, password);
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
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="bg-gray-200 border border-gray-300 rounded-lg p-2 w-full"
          type="password"
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
