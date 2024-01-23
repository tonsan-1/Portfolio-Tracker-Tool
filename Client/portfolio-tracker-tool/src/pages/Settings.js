import React, { useRef } from 'react'
import Sidebar from '../components/Sidebar';
import { useUserUpdate } from '../hooks/useUserUpdate'


export default function Settings() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const { updateUser } = useUserUpdate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await updateUser(firstNameRef.current.value, lastNameRef.current.value);
    }


    return (
        <div className='flex h-screen overflow-hidden'>
            <Sidebar />
            <main className="bg-gray-100 h-screen w-full overflow-y-auto">
                <div className="antialiased bg-gray-200 text-gray-900 font-sans">
                    <div className="flex items-center h-screen w-full">
                        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                            <span className="block w-full text-xl uppercase font-bold mb-4">Update your name</span>
                            <form className="mb-4" onSubmit={handleSubmit}>
                                <div className="mb-4 md:w-full">
                                    <label for="firstname" className="block text-xs mb-1">First Name</label>
                                    <input ref={firstNameRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="First Name" />
                                </div>
                                <div className="mb-6 md:w-full">
                                    <label for="lastname" className="block text-xs mb-1">Last Name</label>
                                    <input ref={lastNameRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="Last Name" />
                                </div>
                                <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
