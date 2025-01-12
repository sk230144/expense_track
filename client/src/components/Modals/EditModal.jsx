import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import './modal.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditModal = ({ date, amount, category, description, id, count, setCount, open, handleClose }) => {
    console.log(date, amount, category, description, "descriptionggsaj")
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        amount: 0,
        category: '',
        description: '',
        date: new Date(),
    });
    useEffect(() => {
        if (id !== '') {
            setFormData({
                amount: amount,
                category: category,
                description: description,
                date: new Date(date),
            });
        } else if(id === '') {
            setFormData({
                amount: 0,
                category: '',
                description: '',
                date: new Date(),
            });
        }
    }, [id, amount, category, description, date]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'amount' ? parseFloat(value) : value,
        }));

        const err = { ...errors };
        delete err[name];
        setErrors(err);
    };

    const validateForm = (formData) => {
        const errors = {};

        if (isNaN(formData.amount) || formData.amount <= 0) {
            errors.amount = 'Amount must be a positive number';
        }
        if (formData.category.trim() === '') {
            errors.category = 'Category is required';
        }
        if (formData.description.trim() === '') {
            errors.description = 'Description is required';
        }


        return errors;
    };
    const [edit, setEdit] = useState(false)
    const [add, setAdd] = useState(false)
    const handleSubmit = async (e) => {
        setAdd(true)
        e.preventDefault();

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/addexpense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setCount(count + 1)
                setFormData({
                    amount: 0,
                    category: '',
                    description: '',
                    date: '',
                });
                handleClose()
                setAdd(false)
            } else {
                console.error('Error adding expense:', response.statusText);
                setAdd(false)
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            setAdd(false)
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setEdit(true)
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setCount(count + 1)
                handleClose()
                setEdit(false)
            } else {
                console.error('Error adding expense:', response.statusText);
                setEdit(false)
            }
        } catch (error) {
            console.error('Error adding expense:', error);
            setEdit(false)
        }
    };


    return (
        <>{open &&
            <div className='transparent-model'>
                <div className='rep-mod-top'>
                    <div className='ahj-header'>
                        <p>{id === '' ? "Add New Record" : "Edit Record"}</p>
                        <RxCross2 className="edit-report-cross-icon" size={20} onClick={handleClose} style={{ cursor: "pointer" }} />
                    </div>
                    <div className='inputs-container'>
                        <div className="inputs-container-div">
                            <p>Amount</p>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                step="0.01"
                                placeholder='Please Enter Amount'
                                maxLength={40}
                            />
                        </div>
                        <div className="inputs-container-div">
                            <p>Category</p>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder='Please Enter Category'
                                maxLength={40}
                            />
                        </div>
                        <div className="inputs-container-div">
                            <p>Description</p>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder='Please Enter Description'
                                maxLength={100}
                            />
                        </div>
                        <div className="inputs-container-div">
                            <p>Date</p>
                            <DatePicker
                                selected={formData.date}
                                onChange={(date) => setFormData({ ...formData, date })}
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                        <button disabled={add || edit} className="button-modal" onClick={id === '' ? handleSubmit : handleEdit}>Submit</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default EditModal
