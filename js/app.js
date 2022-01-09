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
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
    const [type, setType] = useState("");

    useEffect(() => {
        const x = numbers.filter((number, index, array) =>
            sparesParts.filter(spares => {
                return spares.drawing === drawing && spares.capacity === +capacityX && spares.number === +number
            })); // tablica z liczbami!!
        setSpares(sparesParts.filter(spares => {
            return spares.drawing === drawing && spares.capacity === +capacityX
        }));
        // console.log(`useEffect: ${capacityX}`);
        // console.log(`useEffect: ${drawing}`);
        console.log(x)
    }, [capacityX, drawing, numbers])

    useEffect(() => {
        // console.log(`useEffect, app, spares: `, spares);
        // console.log(`useEffect, app, numbers: `, numbers)
    }, [spares])

    const addNewCapacity = (capacity, drawing) => {
        setCapacityX(capacity);
        setDrawing(drawing);
        // console.log(`addNewCapacity ${drawing} `);
        // console.log(`addNewCapacity ${capacity}`);
    }

    const onNewNumbers = (numberArray) => {
        console.log(`BodyPageFunction`)
        setNumbers(numberArray);
        console.log(`app: ${numberArray}`)
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
                <Route path="drawing" element={<BodyPage drawingP={drawing} capacityP={capacityX} addToBasket={onNewNumbers} />} />
                <Route path="order" element={<FormOrder sparesP={spares} numbersP={numbers} />} />
            </Routes>
        </>
    )
}

ReactDOM.render(<BrowserRouter>
    <App/>
</BrowserRouter>, document.querySelector("#app"));