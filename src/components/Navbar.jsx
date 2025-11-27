import React from "react";
import { Link } from "react-router";
import { auth } from "../services/firebaseconfig";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

const Navbar = () => {

    const dispatch = useDispatch();
    
    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
            })
            .catch((error) => {
                alert(error.code);
            })
    }

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <Link to="/" className="text-2xl font-bold text-indigo-200 hover:text-indigo-400 transition-colors">
                    🎬CinemaVerse
                </Link>
                <div className="flex space-x-6 text-lg">
                    <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-indigo-300 transition-colors">About</Link>
                    <Link to="/favorites" className="hover:text-indigo-300 transition-colors">Favorites</Link>
                    <Link to="/discover" className="hover:text-indigo-300 transition-colors">Discover</Link>
                </div>
                <button
                    onClick={handleSignout}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;