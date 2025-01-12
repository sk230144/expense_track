import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';








const PieChartComp = ({ expenses }) => {

    const generateColor = (index, total) => {
        const hue = (index * (360 / total)) % 360; // Distributes colors evenly around the color wheel
        return `hsl(${hue}, 70%, 50%)`;
    };

    const data = expenses.reduce((acc, expense) => {
        const existingEntry = acc.find(item => item.name === expense.category);
        if (existingEntry) {
            existingEntry.value += expense.amount;
        } else {
            acc.push({
                name: expense.category,
                value: expense.amount
            });
        }
        return acc;
    }, []);


    const totalDataPoints = data.length;

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={generateColor(index, totalDataPoints)} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value, name) => [`INR ${value}`, name]}
                />

                <Legend
                    wrapperStyle={{ fontSize: '12px', fontWeight: '500' }}
                    formatter={(value) => value}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartComp
