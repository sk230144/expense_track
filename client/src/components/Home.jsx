import React, { useEffect, useState } from 'react'
import './styles/home.css'
import Table from './Table/Table'
import PieChartComp from './Charts/PieChart';
import BarChartComponent from './Charts/BarChartComp';
import DataNotFound from './utils/DataNotFound';
import MicroLoader from './utils/loader';


const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('')

  useEffect(() => {
    setLoading(true);
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/expenses');
        const data = await response.json();

        if (data.success) {
          setExpenses(data.expenses);
          setLoading(false);
        } else {
          setError('Failed to fetch expenses');
          setLoading(false);
        }
      } catch (error) {
        setError('An error occurred while fetching expenses');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [count]);

  const stylesGraph = {
    width: '100%',
    height: '500px',
    padding: "1rem",
    borderRight: '1px solid #e0e0e0'
  };

  return (
    <div className='top-expense'>
      <div className='expense-header'>
        <p>Expense Tracker</p>
        <button onClick={() => { setOpen(true); setId('') }} className='add-new-button'>Add New</button>
      </div>
      <div className='charts-main-container' >
        {(loading) ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MicroLoader/>
          </div>
        ) : (expenses.length > 0) ? (
          <>
            <div className="chart-cont"  style={stylesGraph}>
              <PieChartComp expenses={expenses} />
            </div>
            <div className="chart-cont" style={stylesGraph}>
              <BarChartComponent expenses={expenses} />
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DataNotFound/>
          </div>
        )}

      </div>

      <Table loading={loading} id={id} setId={setId} open={open} setOpen={setOpen} expenses={expenses} count={count} setCount={setCount} />

    </div>
  )
}

export default Home
