import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { getDatabase, ref, get, update  } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

function Account() {
  const auth = getAuth();
  const db = getDatabase();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = ref(db, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name || "");
          setAddress(userData.address || "None");
          setOrderCount(Object.keys(userData.orders || {}).length);
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleChangePassword = async () => {
    let newErrors = {};

    if (!oldPassword.trim())
      newErrors.oldPassword = "Old password is required.";
    if (!newPassword.trim())
      newErrors.newPassword = "New password is required.";

    if (Object.keys(newErrors).length === 0) {
      try {
        const userCredential = await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(user.email, oldPassword)
        );

        if (userCredential) {
          await updatePassword(auth.currentUser, newPassword);
          toast.success("Password updated successfully!");
          setShowChangePassword(false); // Hide password change fields after successful update
          setOldPassword("");
          setNewPassword("");
        }
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          newErrors.oldPassword = "Old password is incorrect.";
        } else {
          newErrors.general = "Error updating password.";
        }
        toast.error("Error updating password");
        console.error("Error updating password: ", error.message);
      }
    }
    setErrors(newErrors);
  };
  const handleSaveChanges = async () => {
    const userRef = ref(db, `users/${auth.currentUser.uid}`);
    const updates = {
      name: name,
      address: address,
    };
    await update(userRef, updates); 
    setEditingField(null);
    toast.success("Details updated successfully!");
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Profile</h2>

        <div className="mb-4 border-b-2 border-gray-200 pb-4">
          <h3 className="text-xl font-medium mb-2">User Details</h3>
          <div className="flex flex-col md:flex-row justify-between items-start mb-3">
            <p className="text-lg mb-3 md:mb-0">
              <strong>Email:</strong> <span className="ml-3"> {user?.email} </span>
            </p>
          </div>

          <div className="flex items-center justify-between mb-3">
    <p className="text-lg">
        <strong>Name:</strong>
        {editingField === "name" ? (
            <input
                className="ml-3 border rounded py-1 px-2 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        ) : (
            <span className="ml-3"> {name} </span>
        )}
    </p>
    <button
        onClick={() => setEditingField("name")}
        className="text-blue-600"
    >
        ✏️
    </button>
</div>

<div className="flex items-center justify-between mb-3">
    <p className="text-lg">
        <strong>Address:</strong>
        {editingField === "address" ? (
            <input
                className="ml-3 border rounded py-1 px-2 focus:border-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
        ) : (
            <span className="ml-3"> {address} </span>
        )}
    </p>
    <button
        onClick={() => setEditingField("address")}
        className="text-blue-600"
    >
        ✏️
    </button>
</div>


          <p className="text-lg">
            <strong>Order Count:</strong> <span className="ml-3">{orderCount}</span>
            <Link to="/orders" className="text-lg ml-3 text-F28B82 hover:underline">View Orders</Link>
          </p>
        </div>
        {editingField && (
          <div className="text-center mt-4">
            <button
              onClick={handleSaveChanges}
              style={{ backgroundColor: "#F28B82" }}
              className="text-white font-bold py-2 px-4 rounded text-base transition-all duration-300 hover:bg-F0696A"
            >
              Save
            </button>
          </div>
        )}
        <div className="mt-4">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="text-F28B82 hover:underline mb-4 block"
          >
           <strong>Change Password</strong> 
          </button>

          {showChangePassword && (
            <div className="mt-4 w-1/2 mx-auto">
              <input
                style={{ borderColor: errors.oldPassword ? "red" : "#F28B82" }}
                className="border rounded w-full py-2 px-3 mb-2"
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">{errors.oldPassword}</p>
              )}

              <input
                style={{ borderColor: errors.newPassword ? "red" : "#F28B82" }}
                className="border rounded w-full py-2 px-3 mb-2"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword}</p>
              )}

              <button
                onClick={handleChangePassword}
                className="bg-[#F28B82] text-white p-4 rounded mt-4 block mx-auto hover:bg-[#f16255]"
                 >
                Update Password
              </button>

              {errors.general && (
                <p className="text-red-500 text-sm mt-2 ">{errors.general}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
