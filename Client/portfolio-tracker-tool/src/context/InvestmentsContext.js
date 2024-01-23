import { createContext, useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

import { API } from '../services/API';

export const InvestmentsContext = createContext();

export const InvestmentsProvider = ({ children }) => {
    let { user } = useAuthContext();
    const [investments, setInvestments] = useState([]);
    const [data, setData] = useState({});
    const [idObj, setIdObj] = useState();

    useEffect(() => {
        if (user) {
            API.getAllInvestments(user)
                .then(investments => {
                    if (investments) {
                        setInvestments(investments);
                    }
                });
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            API.createInvestment(data, user)
                .then(investment => {
                    setInvestments(investments => [investment, ...investments]);
                });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() => {
        if (user) {
            API.closeInvestment(idObj, user)
                .then(closedInvestment => {
                   var index = investments.findIndex(item => item.id === closedInvestment.id);
                   var newArr = [...investments];
                   newArr[index] = {...newArr[index], status: closedInvestment.status}
                   setInvestments(newArr);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idObj])

    //actions
    const createInvestment = data => setData(data);
    const closeInvestment = data => setIdObj(data);

    return (
        <InvestmentsContext.Provider value={{ investments, createInvestment , closeInvestment}}>
            {children}
        </InvestmentsContext.Provider>
    )
}