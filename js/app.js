import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {FormOrder} from "./components/FormOrder";
import {HoistPage} from "./components/HoistPage";
import {BodyPage} from "./components/BodyPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { sparesParts} from "./data/datas";

const App = () => {
    const [capacityX, setCapacityX] = useState("");
    const [drawing, setDrawing] = useState("");
    const [spares, setSpares] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [type, setType] = useState("");

    useEffect(() => {
        setSpares(sparesParts.filter(({drawing: drawVal,capacity}) => drawVal === drawing && capacity === +capacityX));
    }, [capacityX, drawing, numbers])

    const addNewCapacity = (capacity, drawing) => {
        setCapacityX(capacity);
        setDrawing(drawing);
    }

    const onNewNumbers = (spareList) => {
        setSpares(spareList);
    }

    return (
        <>
            <nav style={{display: "flex", justifyContent: "center"}}>
                <Link className="navigation" to="/">
                    <i className="fa fa-home" aria-hidden="true">home</i>
                </Link>
                <Link className="navigation" to="/drawing">
                    <i className="fas fa-book-open" aria-hidden="true" />
                </Link>
                <Link className="navigation" to="/order">
                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                </Link>
            </nav>
            <Routes>
                <Route path="/" element={<HoistPage onNewCapacity={addNewCapacity} />} />
                <Route path="drawing" element={<BodyPage drawingP={drawing} capacityP={capacityX} addToBasket={onNewNumbers} />} />
                <Route path="order" element={<FormOrder drawingP={drawing} sparesP={spares} />} />
            </Routes>
        </>
    )
}

ReactDOM.render(<BrowserRouter>
    <App/>
</BrowserRouter>, document.querySelector("#app"));