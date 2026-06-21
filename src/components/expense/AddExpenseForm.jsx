import React, { useState } from 'react'
import Input from '../inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';



const AddExpenseForm = ({ onAddExpense, isLoading }) => {

    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });


    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Rent, Grocerry , etc. "
                label="Category"
                type="text"
                UsedIn="AddExpenseForm"
            />

            <Input
                value={expense.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder=""
                label="Amount"
                type="number"
                UsedIn="AddExpenseForm"
            />

            <Input
                value={expense.date}
                onChange={(e) => handleChange("date", e.target.value)}
                placeholder="Enter date"
                label="Date"
                type="date"
                UsedIn="AddExpenseForm"
            />

            <div className="flex justify-end mt-6">
                <button className="add-btn add-btn-fill" type='button' onClick={() => onAddExpense(expense)} >
                    Add Expense
                </button>
            </div>

        </div>
    )
}

export default AddExpenseForm