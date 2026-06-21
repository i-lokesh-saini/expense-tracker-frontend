import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
// import CustomTooltip from './CustomTooltip'


const CustomBarChart = ({data,xAxisKey = "category",
  tooltipKey = "category"}) => {
    
    // Function to alternate Color
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length){
            return(
                <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload[tooltipKey]}</p>
                    <p className="text-sm text-gray-600">
                        Amount: <span className="text-xs font-medium text-gray-900">₹{payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    }

    
    return (
        <div className="bg-white mt-6 h-80">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis
                        dataKey={xAxisKey}
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="amount"
                        radius={[10, 10, 0, 0]}
                    >
                        {data?.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={getBarColor(index)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart