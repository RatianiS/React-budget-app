import React, { useEffect, useState } from "react";
import "./component-style/rendertask.css";

const RenderTask = ({ expenses, onDeleteExpense }) => {
    const deleteExpense = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/v1/expenses/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: sessionStorage.getItem("accessToken"),
                },
            });

            if (!res.ok) {
                throw new Error("Network response was not ok.");
            }

            onDeleteExpense(id);
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const taskList = expenses.map((expense) => {
        const expenseClassname = expense.type === "income" ? "income" : "expense";
        return (
            <div
                key={expense._id}
                className={expenseClassname}
                style={{ marginBottom: "10px", width: "300%" }}
            >
                <p>Amount: {expense.amount}</p>
                <p>Category: {expense.category}</p>
                <p>type: {expense.type}</p>
                <button className="deletebtn" onClick={() => deleteExpense(expense._id)}>
                    Delete
                </button>
                <button className="editbtn">Edit</button>
            </div>
        );
    });

    return <div>{taskList}</div>;
};

export default RenderTask;
