import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from './styles.module.css';

const BarChartComponent = ({ expenses }) => {
  console.log(expenses, "formatter={(value) => value}  ")

  const data = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    const existingEntry = acc.find(item => item.name === monthYear);
    if (existingEntry) {
      existingEntry.value += expense.amount;
    } else {
      acc.push({
        name: monthYear, // Now showing both month and year
        value: expense.amount
      });
    }
    return acc;
  }, []);


  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={730}
        height={250}
        data={data}
        barCategoryGap="5%"
        className={styles.barChart}
        margin={{ top: 22, right: 18, left: 0, bottom: 0 }}
        stackOffset="sign"

      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="0"
          className={styles.grid}
        />

        <XAxis
          dataKey="name"
          className={styles.axis}
          height={50}
          tickSize={10}
          dy={4}
          interval={0} />
        <YAxis
          className={styles.axis}
          tickSize={10}
          tickLine={{ stroke: 'black', strokeWidth: 1 }}
        />
        <Tooltip
          cursor={{ fill: '#E7F0FF' }}
          wrapperStyle={{
            outline: 'none',
            borderRadius: 4,
            padding: 8,
            boxShadow: 'none',
            fontSize: 12,
          }}
          formatter={(value) => [`Amount: INR ${value}`]} // Replaces 'Value' with 'Amount'
          labelFormatter={(label) => `${label}`}
        />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="circle"   // Set icon as a circle
          iconSize={8}        // Reduce circle size
          formatter={(name) => (
            <span style={{ color: '#767676', fontWeight: '400', fontSize: '12px', fontFamily: 'Poppins' }}>
              Amount
            </span>
          )}
          wrapperStyle={{
            paddingBottom: '10px',
            cursor: 'pointer',
          }}
        />
        <Bar dataKey="value" fill="#4585F7" activeBar={<Rectangle fill="#CBFF5C" stroke="#4585F7" />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
