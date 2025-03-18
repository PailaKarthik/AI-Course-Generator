"use client";
import { useEffect, useState } from "react";
import { auth } from "../app/auth"; // Assuming auth is the authentication utility

const ProfileDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchUserData = async () => {
        const response = await fetch("/api/user/profile");
        const data = await response.json();
        setUser(data); // Update user state with fetched data

            const session = await auth();
            if (session) {
                setUser(session.user); // Assuming session contains user data
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return ( 
       

        <div className="max-w-6xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">

            <h1 className="text-2xl font-semibold">Profile Dashboard</h1>
            {user ? (
                <div>
                    <h2 className="text-xl">Welcome, {user.name}</h2>
                    <p>Email: {user.email}</p>
                    {/* Add more user information and courses here */}
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default ProfileDashboard;
