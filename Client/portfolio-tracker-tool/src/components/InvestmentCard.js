import React, { useContext } from 'react'
import { InvestmentsContext } from '../context/InvestmentsContext';
import dayjs from "dayjs";

export default function InvestmentCard({ investment }) {
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const { closeInvestment } = useContext(InvestmentsContext);
    var createdOn = dayjs(investment.createdOn).fromNow();

    return (
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4">
            <div className="w-full p-1">
                <div id="card-3" className="bg-gray-100 shadow-lg rounded overflow-hidden flex flex-wrap flex-col">
                    <header className="p-3 flex items-center">
                        <div>
                            <p className="w-full text-gray-800"><strong>{investment.name}</strong> <small className="text-light text-gray-600">{createdOn}</small></p>
                            <p className="w-full text-gray-600 text-xs">Type: {investment.type}</p>
                        </div>
                    </header>
                    <div className="px-3">
                        <span className="font-semibold text-gray-600 text-sm">Status: {investment.status}</span>
                    </div>
                    <p className="p-3 text-xl">Invested value: ${investment.value.toLocaleString()}</p>
                    <footer className="w-full border-t border-gray-200 mt-3">
                        <ul className="list-none w-full flex text-center" role="navigation">
                            <button disabled={investment.status === 'Closed'} onClick={() => closeInvestment({id:investment.id})} className="block w-full p-2 hover:bg-gray-200 text-gray-700 hover:text-pink-600 focus:outline-none focus:bg-pink-100 focus:text-pink-600">
                                <span>{investment.status === 'Active' ? 'Close Investment' : 'Closed'}</span>
                            </button>
                        </ul>
                    </footer>
                </div>
            </div>
        </div>
    );
}