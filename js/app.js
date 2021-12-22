import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {FormOrder} from "./components/FormOrder";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HoistPage from "./components/HoistPage";
import {createHoist} from "./components/Promise";

const App = () => {
    const [capacity, setCapacity] = useState({
        capacityInput: 500
    });
    const [type, setType] = useState("");
    const [drawing, setDrawing] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        createHoist().then((hoist) => {
            setCapacity(hoist);
        });
        console.log(`capacity z setCapacity/promise/useEffect: ${capacity}`);
    }, [capacity]);

    const addNewCapacity = (hoist) => {
            setCapacity(hoist);
        }

    return (
        <>
            <nav style={{display: "flex", justifyContent: "center"}}>
                <Link className="navigation" to="/">
                    <i className="fa fa-home" aria-hidden="true"></i></Link>
                <Link className="navigation" to="/order">
                    <i className="fa fa-shopping-basket" aria-hidden="true"></i></Link>
            </nav>
            <Routes>
                <Route path="/" element={<HoistPage onNewCapacity={addNewCapacity} />} />
                <Route path="order" element={<FormOrder drawing="1A" number={6} capacity={500} />} />
            </Routes>
        </>
    )
}

ReactDOM.render(<BrowserRouter>
    <App/>
</BrowserRouter>, document.querySelector("#app"));