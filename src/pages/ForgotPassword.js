import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Forgot Password Form */}
      <main className="flex-grow flex items-center justify-center py-2">
        <div className="max-w-xl mx-auto p-14 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-8">Forgot Password</h1>
          
          <p className="mb-8 text-xl">Enter the email associated with your account and we'll send you a link to reset your password.</p>

          <input className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="email" placeholder="Email" />

          <button className="bg-[#F28B82] hover:bg-[#F0696A] text-white font-bold w-full py-4 px-5 mb-6 rounded text-xl transition-all duration-300">
              Send Reset Link
          </button>

          <p className="mt-4 text-xl">
            Remembered your password? <Link to="/login" className="text-[#F28B82] hover:underline">Login here</Link>
          </p>
        </div>
      </main>

    </div>
  );
}

export default ForgotPasswordPage;
