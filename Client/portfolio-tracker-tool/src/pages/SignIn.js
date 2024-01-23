import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'

export default function SignUp() {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(usernameRef.current.value, passwordRef.current.value);
    }

    return (
        <div className="antialiased bg-gray-200 text-gray-900 font-sans">
            <div className="flex items-center h-screen w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold mb-4">Sign In</span>
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4 md:w-full">
                            <label for="username" className="block text-xs mb-1">Username</label>
                            <input ref={usernameRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="Username"/>
                        </div>
                        <div className="mb-6 md:w-full">
                            <label for="password" className="block text-xs mb-1">Password</label>
                            <input ref={passwordRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" placeholder="Password"/>
                        </div>
                        <button disabled={isLoading} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Sign In</button>
                        <p className='py-3'>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        {error &&
                            <div className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative" role="alert">
                                <strong className="font-bold">{error}</strong>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
