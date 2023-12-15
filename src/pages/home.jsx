import React, { useEffect, useState } from "react";
import Filter from "../components/filter";
import RenderTask from "../components/rendertask";
import Form from "../components/addexpense";
import Header from "../components/header";

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/expenses", {
                    method: "GET",
                    headers: {
                        Authorization: sessionStorage.getItem("accessToken"),
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }

                const data = await response.json();
                setExpenses(data);
            } catch (error) {
                console.error("Fetch expenses error:", error.message);
            }
        };

        fetchExpenses();
    }, []);

    const handleFilterSelect = (filters) => {
        const filteredData = handleFilter(expenses, filters);
        setFilteredExpenses(filteredData);
    };

    const handleFilter = (array, filters) => {
        return array.filter((item) => {
            if (
                (filters.min && item.amount < filters.minAmount) ||
                (filters.max && item.amount > filters.maxAmount) ||
                (filters.type && item.type !== filters.type) ||
                (filters.category && item.category !== filters.category) ||
                (filters.date && item.date !== filters.date)
            ) {
                return false;
            }
            return true;
        });
    };

    const handleDeleteExpense = (id) => {
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    };

    return (
        <div>
            <div style={{ marginBottom: "30px" }}>
                <Header />
            </div>
            <div style={{ display: "flex" }}>
                <div>
                    <Form />
                    <Filter onFiltersSelect={handleFilterSelect} />
                </div>
                <RenderTask
                    expenses={filteredExpenses.length > 0 ? filteredExpenses : expenses}
                    onDeleteExpense={handleDeleteExpense}
                />
            </div>
        </div>
    );
}

export default Home;
