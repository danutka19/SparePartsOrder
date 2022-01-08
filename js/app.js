import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {FormOrder} from "./components/FormOrder";
import HoistPage from "./components/HoistPage";
import {createHoist} from "./data/createHoist";
import {BodyPage} from "./components/BodyPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

const App = () => {
    const [capacityX, setCapacityX] = useState(2000)
    const [type, setType] = useState("");
    const [drawing, setDrawing] = useState("2A");
    const [number, setNumber] = useState("");

    useEffect(() => {
        // setCapacityX(addNewCapacity(capacity))
        // setDrawing(photo => addNewCapacity(photo))
        console.log(`useEffect: ${capacityX}`)
        console.log(`useEffect: ${drawing}`)

    }, [capacityX]);

    const addNewCapacity = (capacity) => {
        setCapacityX(capacity);
        console.log(`chce wyswietlic ${capacityX} `)
        console.log(capacity);
    }

    return (
        <>
            <nav style={{display: "flex", justifyContent: "center"}}>
                <Link className="navigation" to="/">
                    <i className="fa fa-home" aria-hidden="true">home</i>
                </Link>
                <Link className="navigation" to="/drawing">
                    <i className="fas fa-book-open" aria-hidden="true"></i>
                </Link>
                <Link className="navigation" to="/order">
                    <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<HoistPage onNewCapacity={addNewCapacity} />} />
                {/*BodyPage i FormOrder pobieraja ze stanu app swoje props, oprócz number, ale to wkrótce:*/}
                <Route path="drawing" element={<BodyPage drawingP={drawing} capacityP={capacityX} />} />
                <Route path="order" element={<FormOrder drawing={drawing} number={6} capacity={capacityX} />} />
            </Routes>
        </>
    )
}

ReactDOM.render(<BrowserRouter>
    <App/>
</BrowserRouter>, document.querySelector("#app"));