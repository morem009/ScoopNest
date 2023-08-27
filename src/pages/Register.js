import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Register Form */}
      <main className="flex-grow flex items-center justify-center py-2">
        <div className="max-w-xl mx-auto p-14 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-8">Register</h1>
          
          <input style={{ borderColor: '#F28B82' }} className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="text" placeholder="Full Name" />
          <input style={{ borderColor: '#F28B82' }} className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="email" placeholder="Email" />
          <input style={{ borderColor: '#F28B82' }} className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="password" placeholder="Password" />
          <input style={{ borderColor: '#F28B82' }} className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" type="password" placeholder="Confirm Password" />

          <button style={{ backgroundColor: '#F28B82' }} className="text-white font-bold w-full py-4 px-5 mb-6 rounded text-xl transition-all duration-300 hover:bg-F0696A">
              Register
          </button>

          <p className="mt-4 text-xl">
            Already have an account? <Link to="/login" className="text-F28B82 hover:underline">Login here</Link>
          </p>
        </div>
      </main>

    </div>
  );
}

export default RegisterPage;
