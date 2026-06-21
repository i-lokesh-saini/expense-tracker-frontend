import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../charts/CustomLineChart';
import { prepareExpenseLineChart } from '../../utils/helper';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChart(transactions);
        setChartData(result);

        return () => { };
    }, [transactions])
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className='text-lg'>ExpenseOverview</h5>
                    <p className='text-sm text-gray-400 mt-0.5'>Track your spending trend over time and gain insights into where your money goes.</p>
                </div>

                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" />
                    Add Expenses
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview