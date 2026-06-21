import React from 'react'
import { LuTrendingUpDown } from "react-icons/lu";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const chartData = [
    { month: 'Jan', income: 120, expense: 130 },
    { month: 'Feb', income: 155, expense: 170 },
    { month: 'Mar', income: 155, expense: 280 },
    { month: 'Apr', income: 160, expense: 230 },
    { month: 'May', income: 60, expense: 70 },
    { month: 'Jun', income: 170, expense: 230 },
    { month: 'Jul', income: 170, expense: 390 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-md text-xs">
                <p className="font-semibold mb-1">{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} className="flex gap-2">
                        <span className="text-gray-500 capitalize">{entry.name}</span>
                        <span className="text-violet-600 font-medium">${entry.value * 10}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            {/* Left panel */}
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
                <h2 className='text-lg font-medium text-black'>Expense tracker</h2>
                {children}
            </div>

            {/* Right decorative panel */}
            <div className='hidden md:flex w-[40vw] h-screen bg-[#EDE9F8] overflow-hidden p-8 relative flex-col justify-between'>

                {/* Top-left purple blob */}
                <div className="w-52 h-52 rounded-[40px] bg-violet-600 absolute -top-8 -left-8 z-0" />

                {/* Right fuchsia blob */}
                <div className="w-52 h-64 rounded-[40px] bg-fuchsia-500 absolute top-[28%] -right-16 z-0" />

                {/* Bottom-left small purple blob */}
                <div className="w-20 h-20 rounded-3xl bg-violet-500 absolute bottom-12 -left-6 z-0" />

                {/* Stats card */}
                <div className='relative z-10 mt-4'>
                    <StatsInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track Your Income & Expenses"
                        value="430,000"
                    />
                </div>

                {/* Spacer */}
                <div className='flex-1' />

                {/* Chart card */}
                <div className='relative z-10 bg-white rounded-2xl shadow-lg p-5'>
                    <div className='flex items-start justify-between mb-1'>
                        <div>
                            <h4 className='font-bold text-gray-900 text-base'>All Transactions</h4>
                            <p className='text-xs text-gray-400 mt-0.5'>2nd Jan to 21th Dec</p>
                        </div>
                        <button className='text-sm text-violet-500 border border-violet-200 rounded-lg px-3 py-1.5 hover:bg-violet-50 transition-colors'>
                            View More
                        </button>
                    </div>

                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={chartData} barCategoryGap="30%" barGap={2}>
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#9ca3af' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#9ca3af' }}
                                ticks={[0, 50, 120, 160, 230, 400]}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar dataKey="expense" fill="#c4b5fd" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="income" fill="#6d28d9" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value }) => {
    return (
        <div className='flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md'>
            <div className='w-12 h-12 flex items-center justify-center text-[22px] text-white bg-violet-500 rounded-full shrink-0'>
                {icon}
            </div>
            <div>
                <p className='text-xs text-gray-500 mb-0.5'>{label}</p>
                <span className='text-2xl font-semibold text-gray-900'>${value}</span>
            </div>
        </div>
    );
};