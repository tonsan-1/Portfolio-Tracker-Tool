import React, { useState, useRef, useContext } from 'react'
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { InvestmentsContext } from '../context/InvestmentsContext';

export default function Header() {
    const { createInvestment } = useContext(InvestmentsContext);
    const [openModal, setOpenModal] = useState(false);
    const nameRef = useRef();
    const typeRef = useRef();
    const amountRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            name: nameRef.current.value,
            type: typeRef.current.value,
            value: amountRef.current.value
        }

        createInvestment(data);
        e.target.reset();
        setOpenModal(false);
    }

    return (
        <>
            <header className="p-4 border-b border-solid border-gray-300">
                <button onClick={() => setOpenModal(true)} className='bg-blue-500 hover:bg-white-700 text-white py-2 px-4 rounded'>
                    Create Investment
                </button>
                <Modal size="md" show={openModal} onClose={() => setOpenModal(false)}>
                    <ModalHeader>Create Investment</ModalHeader>
                    <ModalBody>
                        <div className="w-full bg-white md:max-w-sm md:mx-auto">
                            <form onSubmit={handleSubmit} className="mb-4">
                                <div className="mb-4 md:w-full">
                                    <label for="name" className="block text-xs mb-1">Name</label>
                                    <input ref={nameRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="Name" />
                                </div>
                                <div className="mb-6 md:w-full">
                                    <label for="text" className="block text-xs mb-1">Type</label>
                                    <input ref={typeRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="Type" />
                                </div>
                                <div className="mb-4 md:w-full">
                                    <label for="value" className="block text-xs mb-1">Amount</label>
                                    <input ref={amountRef} className="w-full border rounded p-2 outline-none focus:shadow-outline" type="number" placeholder="Amount" />
                                </div>
                                <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Create</button>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </header>
        </>
    )
}