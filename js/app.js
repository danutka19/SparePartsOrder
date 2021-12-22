import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {FormOrder} from "./components/FormOrder";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HoistPage from "./components/HoistPage";
import {createHoist} from "./components/Promise";

const App = () => {
    const [capacity, setCapacity] = useState("");
    const [type, setType] = useState("");
    const [drawing, setDrawing] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        createHoist().then((data) => {
            setCapacity(data);
            console.log(`capacity z setCapacity/promise: ${capacity}`);
        });
    }, []);

    const addNewCapacity = () => {
            setCapacity();
        }


    return (
        <>
            <nav style={{display: "flex", justifyContent: "center"}}>
                <Link className="navigation" to="/">Home</Link>
                <Link className="navigation" to="/order">Basket</Link>
            </nav>
            <Routes>
                <Route path="/" element={<HoistPage onNewCapacity={addNewCapacity} />} />
                <Route path="order" element={<FormOrder drawing="1A" number={6} capacity={capacity} />} />
            </Routes>
        </>
    )
}

ReactDOM.render(<BrowserRouter>
    <App/>
</BrowserRouter>, document.querySelector("#app"));