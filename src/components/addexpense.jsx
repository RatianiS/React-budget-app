import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./component-style/addexpense.css";

const Form = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("salary");
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/v1/expenses/", {
                method: "POST",
                headers: {
                    Authorization: sessionStorage.getItem("accessToken"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type,
                    category,
                    amount,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add expense");
            }

            const result = await response.json();
            console.log(result);

            setData((prevData) => [...prevData, result]);

            setType("income");
            setCategory("salary");
            setAmount(0);

            window.location.reload();
        } catch (error) {
            console.error("Add expense error:", error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/expenses/");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main>
            <form className="addexpense-form" onSubmit={handleSubmit}>
                <p className="addexpense-form-headp">Add Expense</p>

                <div>
                    <label>
                        შემოსავალი
                        <input
                            type="radio"
                            name="radio"
                            id="income"
                            value="income"
                            checked={type === "income"}
                            onChange={() => {
                                if (type === "expense") {
                                    setType("income");
                                }
                            }}
                        />
                    </label>
                    <label>
                        გასავალი
                        <input
                            type="radio"
                            name="radio"
                            id="expense"
                            value="expense"
                            checked={type === "expense"}
                            onChange={() => {
                                if (type === "income") {
                                    setType("expense");
                                }
                            }}
                        />
                    </label>
                </div>

                <label>
                    კატეგორია:
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                    >
                        {type === "income" ? (
                            <>
                                <option value="salary">salary</option>
                                <option value="invoice">invoice</option>
                                <option value="bonus">bonus</option>
                                <option value="other">other</option>
                            </>
                        ) : (
                            <>
                                <option value="shopping">shopping</option>
                                <option value="gym">gym</option>
                                <option value="entertainment">entertainment</option>
                            </>
                        )}
                    </select>
                </label>

                <label>
                    თანხა:
                    <input
                        className="addexpense-form-amount"
                        type="number"
                        id="amountmoney"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>

                <button className="addexpense-form-submitbtn" type="submit">
                    დამატება
                </button>
            </form>
        </main>
    );
};

export default Form;
