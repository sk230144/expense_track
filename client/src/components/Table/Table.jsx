import React, { useState } from 'react'
import './table.css'
import { MdDelete, MdEdit } from "react-icons/md";
import EditModal from '../Modals/EditModal';
import DeleteModal from '../Modals/DeleteModal';
import DataNotFound from '../utils/DataNotFound';
import MicroLoader from '../utils/loader';
const Table = ({loading, id, setId, open, setOpen, expenses, count, setCount }) => {


    const [openDelete, setOpenDelete] = useState(false);


    const handleClose = () => {
        setOpen(false)
    }

    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [deleteId, setDeleteId] = useState([])


    return (
        <>
            <EditModal description={desc} category={category} amount={amount} date={date} id={id} count={count} setCount={setCount} open={open} handleClose={handleClose} />
            <DeleteModal count={count} setCount={setCount} deleteId={deleteId} open={openDelete} setOpen={setOpenDelete} />
            <div className='table-main'>
                {(loading) ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MicroLoader/>
                    </div>
                ) : (expenses.length > 0) ? (
                    <>
                        <div className="editTarget-table-container" style={{ height: "450px" }}>
                            <table className="editTarget-custom-table" >
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses && expenses.map((expense) => (
                                        <tr key={expense._id}>
                                            <td>{expense.description}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.amount}</td>
                                            <td>{new Date(expense.date).toLocaleDateString()}</td>
                                            <td>
                                                <div className='actions-div'>
                                                    <MdEdit size={24} style={{ cursor: "pointer" }} onClick={
                                                        () => {
                                                            setOpen(true);
                                                            setId(expense.id)
                                                            setDesc(expense.description)
                                                            setCategory(expense.category)
                                                            setAmount(expense.amount)
                                                            setDate(expense.date)
                                                        }
                                                    } />
                                                    <MdDelete style={{ cursor: "pointer" }} size={24} onClick={() => { setOpenDelete(true); setDeleteId([expense._id]) }} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <DataNotFound/>
                    </div>
                )}
            </div>
        </>
    )
}

export default Table
