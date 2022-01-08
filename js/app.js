import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {FormOrder} from "./components/FormOrder";
import HoistPage from "./components/HoistPage";
import {BodyPage} from "./components/BodyPage";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { sparesParts} from "./data/datas";

const App = () => {
    const [capacityX, setCapacityX] = useState(500);
    const [drawing, setDrawing] = useState("1A");
    const [spares, setSpares] = useState([]);
    const [number, setNumber] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        setSpares(sparesParts.filter(spares => {
            return spares.drawing === drawing && spares.capacity === +capacityX
        }));
        console.log(`useEffect: ${capacityX}`);
        console.log(`useEffect: ${drawing}`);
    }, [capacityX, drawing])

    useEffect(() => {
        console.log(`useEffect: `, spares);
    }, [spares])

    const addNewCapacity = (capacity, drawing) => {
        setCapacityX(capacity);
        setDrawing(drawing);
        console.log(`addNewCapacity ${drawing} `);
        console.log(`addNewCapacity ${capacity}`);
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
                <Route path="drawing" element={<BodyPage drawingP={drawing} capacityP={capacityX} />} />
                <Route path="order" element={<FormOrder sparesP={spares} />} />
            </Routes>
        </>
    )
}

ReactDOM.render(<BrowserRouter>
    <App/>
</BrowserRouter>, document.querySelector("#app"));