import React, { useState } from "react";
import "../components/component-style/filter.css";

const Filter = (props) => {
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    const handleFilter = (e) => {
        e.preventDefault();

        const filters = {
            // date,
            category,
            min: min !== "" ? parseInt(min) : undefined,
            max: max !== "" ? parseInt(max) : undefined,
        };

        props.onFiltersSelect(filters);
    };

    const handleClear = (e) => {
        e.preventDefault();

        setDate("");
        setCategory("");
        setMin("");
        setMax("");

        props.onFiltersSelect({});
    };

    return (
        <div className="filter-nav">
            <p className="filter-headp">Filter Expenses</p>
            {/* <label>
                Created at:
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label> */}

            <label>
                Category:
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="shopping">Shopping</option>
                    <option value="gym">Gym</option>
                    <option value="salary">Salary</option>
                    <option value="bonus">bonus</option>
                    <option value="invoice">invoice</option>
                    <option value="entertainment">entertainment</option>
                    <option value="other">Other</option>
                </select>
            </label>

            <label>
                Min:
                <input type="text" value={min} onChange={(e) => setMin(e.target.value)} />
            </label>

            <label>
                Max:
                <input type="text" value={max} onChange={(e) => setMax(e.target.value)} />
            </label>

            <button className="filter-submitbtn" id="filterbtn" onClick={handleFilter}>
                Filter
            </button>

            <button className="filter-submitbtn" onClick={handleClear}>
                Clear
            </button>
        </div>
    );
};

export default Filter;
