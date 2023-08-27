import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center py-2">
        <div className="max-w-xl mx-auto p-14 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-8">Login</h1>
          
          <input style={{ borderColor: '#F28B82' }} className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="email" placeholder="Email" />
          <input style={{ borderColor: '#F28B82' }} className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="password" placeholder="Password" />

          <div className="flex justify-between items-center mb-6">
          <Link to="/forgot-password" className="text-F28B82 text-base hover:underline">Forgot password?</Link>
            <button style={{ backgroundColor: '#F28B82' }} className="text-white font-bold py-4 px-8 rounded text-xl transition-all duration-300 hover:bg-F0696A">
              Login
            </button>
          </div>

          <p className="mt-4 text-xl">
            Don't have an account? <Link to="/register" className="text-F28B82 hover:underline">Register here</Link>
          </p>
        </div>
      </main>

    </div>
  );
}

export default LoginPage;
