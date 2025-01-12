import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const DeleteModal = ({ count, setCount, deleteId, open, setOpen }) => {

    const [load, setLoad] = useState(false)
    const handleEdit = async (e) => {
        e.preventDefault();
        setLoad(true)
        try {
            const response = await fetch(`http://localhost:5000/api/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: deleteId }),
            });

            if (response.ok) {
                const data = await response.json();
                setCount(count + 1)
                setOpen(false)
                setLoad(false)
            } else {
                console.error('Error adding expense:', response.statusText);
                setLoad(false)
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            setLoad(false)
        }
    };

    return (
        <>
            {open &&
                <div className='transparent-model'>
                    <div className='rep-mod-top'>
                        <div className='ahj-header'>
                            <p>Delete</p>
                            <RxCross2 className="edit-report-cross-icon" size={20} onClick={() => { setOpen(false) }} style={{ cursor: "pointer" }} />
                        </div>
                        <div className='button-div-delete'>
                            <p>Are you sure, you want to delete ?</p>
                            <button disabled={load} className='delete-record' onClick={handleEdit}>Delete Record</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default DeleteModal
