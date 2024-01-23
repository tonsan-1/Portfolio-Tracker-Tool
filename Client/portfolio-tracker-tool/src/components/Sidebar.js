import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <>
            <div className={`${open ? 'w-60' : 'w-25'} duration-300 h-screen bg-gray-900 relative`}>
                <header className="border-b border-solid border-gray-800 flex-grow">
                    <Link to="/">
                        <h1 className="py-6 px-4 text-gray-100 text-base font-medium">{user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : user.username}</h1>
                    </Link>
                </header>
                <div onClick={() => setOpen(!open)} className={`${!open && 'rotate-180'} absolute cursor-pointer -right-3 top-15 w-7 border-2 rounded-full bg-white`}>
                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                    </svg>
                </div>
                <span className="text-xs text-gray-500 block py-6 px-6">MENU</span>
                <ul className="font-medium px-4 text-left">
                    <li className="text-gray-100">
                        <Link to="/">
                            <button className={`rounded text-sm text-left block py-3 px-6 hover:bg-blue-600 w-full`}>
                                Dashboard
                            </button>
                        </Link>
                    </li>
                    <li className="text-gray-100">
                        <Link to="/settings">
                            <button className="rounded text-sm text-left block py-3 px-6 hover:bg-blue-600 w-full">Settings</button>
                        </Link>
                    </li>
                    <li className="text-gray-100">
                        <button onClick={() => logout()} className="pb-2 px-6 py-3 rounded text-left text-sm hover:bg-blue-600 w-full">Logout</button>
                    </li>
                </ul>
            </div>
        </>
    )
}
