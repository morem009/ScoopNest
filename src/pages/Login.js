import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleLogin = async () => {
        let newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required.";
        if (!password.trim()) newErrors.password = "Password is required.";

        if (Object.keys(newErrors).length === 0) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success("User logged in successfully");
                window.scrollTo(0, 0);
                navigate('/');  // Navigate to home page after successful login
            } catch (error) {
                if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                    newErrors.general = "Invalid email or password.";
                    toast.error("Invalid email or password.");
                } else {
                    newErrors.general = error.message;
                    toast.error(error.message);
                }
                console.error("Error logging in: ", error.message);
            }
        }
        setErrors(newErrors);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex items-center justify-center py-0">
                <div className="max-w-xl mx-auto p-14 bg-white rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-8">Login</h1>

                    <input
                        style={{ borderColor: errors.email ? 'red' : '#F28B82' }}
                        className="border rounded w-full py-4 px-5 mb-3 text-xl shadow-sm focus:border-F28B82"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    <input
                        style={{ borderColor: errors.password ? 'red' : '#F28B82' }}
                        className="border rounded w-full py-4 px-5 mb-3 text-xl shadow-sm focus:border-F28B82"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    <div className="flex justify-between items-center mb-6">
                        <Link to="/forgot-password" className="text-F28B82 text-base hover:underline">Forgot password?</Link>
                        <button onClick={handleLogin} style={{ backgroundColor: '#F28B82' }} className="text-white font-bold py-4 px-8 rounded text-xl transition-all duration-300 hover:bg-F0696A">
                            Login
                        </button>
                    </div>

                    {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}

                    <p className="mt-4 text-xl">
                        Don't have an account? <Link to="/register" className="text-F28B82 hover:underline">Register here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;
