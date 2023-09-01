import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth();

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleRegister = async () => {
        let newErrors = {};

        // Validations
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
        if (password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const db = getDatabase();
            const userRef = ref(db, `users/${userCredential.user.uid}`);
            set(userRef, {
                name: name,
                address: "None" // initializing address to "None"
            });
            toast.success("User registered successfully!");
    
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('This email is already in use. Please try another one.');  // <- Use toast here
            } else {
                toast.error(error.message);  // <- Use toast here
                console.error("Error registering user: ", error.message);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Register Form */}
            <main className="flex-grow flex items-center justify-center py-2">
                <div className="max-w-xl mx-auto p-14 bg-white rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-8">Register</h1>
                    
                    {/* Name Input */}
                    <input 
                        style={{ borderColor: errors.name ? 'red' : '#F28B82' }} 
                        className="border rounded w-full py-4 px-5 mb-2 text-xl shadow-sm focus:border-F28B82" 
                        type="text" 
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="text-red-500 text-sm mb-6">{errors.name}</span>}

                    {/* Email Input */}
                    <input 
                        style={{ borderColor: errors.email ? 'red' : '#F28B82' }} 
                        className="border rounded w-full py-4 px-5 mb-2 text-xl shadow-sm focus:border-F28B82" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="text-red-500 text-sm mb-6">{errors.email}</span>}

                    {/* Password Input */}
                    <input 
                        style={{ borderColor: errors.password ? 'red' : '#F28B82' }} 
                        className="border rounded w-full py-4 px-5 mb-2 text-xl shadow-sm focus:border-F28B82" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="text-red-500 text-sm mb-6">{errors.password}</span>}

                    {/* Confirm Password Input */}
                    <input 
                        style={{ borderColor: errors.confirmPassword ? 'red' : '#F28B82' }} 
                        className="border rounded w-full py-4 px-5 mb-6 text-xl shadow-sm focus:border-F28B82" 
                        type="password" 
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <span className="text-red-500 text-sm mb-6">{errors.confirmPassword}</span>}

                    <button 
                        onClick={handleRegister} 
                        style={{ backgroundColor: '#F28B82' }} 
                        className="text-white font-bold w-full py-4 px-5 mb-6 rounded text-xl transition-all duration-300 hover:bg-F0696A"
                    >
                        Register
                    </button>
                    {errors.general && <span className="text-red-500 text-sm mb-6">{errors.general}</span>}
                    
                    <p className="mt-4 text-xl">
                        Already have an account? <Link to="/login" className="text-F28B82 hover:underline">Login here</Link>
                    </p>
                </div>
            </main>

        </div>
    );
}

export default RegisterPage;
