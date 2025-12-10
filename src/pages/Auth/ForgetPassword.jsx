import React, {  useState } from 'react';

import useAuth from '../../hooks/useAuth';

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForget = () => {
    resetPassword(email)
      .then(() => {
        setMessage("Password reset link sent to your email!");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

      <input 
        type="email" 
        className="input input-bordered w-full mb-4"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button 
        className="btn btn-primary w-full"
        onClick={handleForget}
      >
        Send Reset Link
      </button>

      {message && <p className="text-green-600 mt-3">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
