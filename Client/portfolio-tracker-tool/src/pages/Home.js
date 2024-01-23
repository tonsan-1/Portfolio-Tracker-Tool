import React, { useContext } from 'react'
import { InvestmentsContext } from '../context/InvestmentsContext';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import InvestmentCard from '../components/InvestmentCard';

function calculatePercentage(filterCondition, itemList) {
    const countMatchingItems = itemList.filter(filterCondition).length;
    const totalCount = itemList.length;

    return (countMatchingItems / totalCount) * 100;
}

export default function Home() {
    const { investments,} = useContext(InvestmentsContext);

    let totalInvestedValue = investments.reduce((accumulator, item) => accumulator + item.value, 0);
    let activeInvestments = investments.filter(item => item.status === 'Active').length;
    let closedInvestments = investments.filter(item => item.status === 'Closed').length;
    let cryptoInvestmentPercentage = calculatePercentage(investment => investment.type === 'Crypto', investments);
    let cashInvestmentPercentage = calculatePercentage(investment => investment.type === 'Cash', investments);
    let goldInvestmentPercentage = calculatePercentage(investment => investment.type === 'Gold', investments);

    const options = {
        title: {
            text: 'My Investments Chart'
        },
        chart: {
            type: 'pie'
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    {
                        name: 'Crypto',
                        y: cryptoInvestmentPercentage
                    },
                    {
                        name: 'Cash',
                        sliced: true,
                        selected: true,
                        y: cashInvestmentPercentage
                    },
                    {
                        name: 'Gold',
                        y: goldInvestmentPercentage
                    }
                ]
            }
        ]
    }

    return (
        <div className='flex'>
            <Sidebar />
            <main className="flex-1 bg-gray-100 h-screen w-full overflow-y-auto">
                <Header/>
                <section className="m-4 bg-white border border-gray-300 border-solid rounded shadow">
                    <header className="border-b border-solid border-gray-300 p-4 text-lg font-medium">
                        Tracker Overview
                    </header>
                    <section className="flex flex-row flex-wrap items-center text-center border-b border-solid border-gray-300">
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3 border-b border-solid border-gray-300 md:border-b-0 sm:border-r">
                            <span className="text-xs font-medium text-gray-500 uppercase">TOTAL INVESTMENTS</span>
                            <div className="py-4 flex items-center justify-center text-center">
                                <span className="text-3xl bg-green-500 rounded py-2 px-3 text-white">${totalInvestedValue.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3 border-b border-solid border-gray-300 md:border-b-0 sm:border-r">
                            <span className="text-xs font-medium text-gray-500 uppercase">ACTIVE INVESTMENTS</span>
                            <div className="py-4 flex items-center justify-center text-center">
                                <span className="text-3xl">{activeInvestments}</span>
                            </div>
                        </div>
                        <div className="p-4 w-full sm:w-1/2 lg:w-1/3 border-b border-solid border-gray-300 md:border-b-0 sm:border-r">
                            <span className="text-xs font-medium text-gray-500 uppercase">CLOSED INVESTMENTS</span>
                            <div className="py-4 flex items-center justify-center text-center">
                                <span className="text-3xl">{closedInvestments}</span>
                            </div>
                        </div>
                    </section>
                    <div className='container mx-auto p-10'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                    <div className="container my-12 mx-auto px-4 md:px-12">
                        <div className="flex flex-wrap -mx-1 lg:-mx-4">
                            {investments.length > 0 ? investments.map(investment => <InvestmentCard investment={investment} key={investment.id} />) : ''}
                        </div>
                    </div>
                </section>
            </main>
        </div >
    )
}
