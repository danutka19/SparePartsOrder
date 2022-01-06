import React, {useState, useEffect} from "react";
import {BodyPage} from "./BodyPage";
import HoistPage from "./HoistPage";
import data from "../data/dataW";

const FirstPage = () => {
    const [spares, setSpares] = useState({data})
    const [firstDisplay, setFirstDisplay] = useState(false);

    useEffect(() => {
        console.log({data})
    })
    const handleBtn = (e) => {
        e.preventDefault();
        setBodyInput(true); //jak działa radio, tak aby jeden miał true/false?
    }

    const clearBtn = (e) => {
        e.preventDefault();
        setCapacityInput("");
        setBodyInput(false);
        setTrolleyInput(false);
        setPhotoNumber(0)
    }

    return (
        <>
            <div className={firstDisplay ? "hidden" : ""}>
                <h3>Choose your chain hoist:</h3>
                <p>Please fill below datas to find neccessary spare(s)</p>
                <form action="" className="form" onSubmit={handleBtn}>
                    <label>Capacity:
                        <input type="text" onChange={e => setCapacityInput(e.target.value)} placeholder="e.g. 500" value={capacityInput}/>[kg]
                    </label>
                    <label>Type:
                        <input type="text" onChange={e => e.target.value} placeholder="e.g. 500W14"/>
                    </label>
                    <label>Power:
                        <input type="text" onChange={e => e.target.value} placeholder="e.g. 400"/>[V]
                    </label>
                    <label>Suspension:
                        <select placeholder="choose">
                            <option value="top hook">TOP HOOK</option>
                            <option value="ce">ELECTRIC TROLLEY</option>
                            <option value="cs">PUSH TROLLEY</option>
                            <option value="eye">EYE SUSPENSION</option>
                            <option value="low headroom trolley">LOW HEADROOM TROLLEY</option>
                        </select>
                    </label>
                    <label>Body
                        <input type="radio" name="body" onChange={e => e.target.value} value={bodyInput}/>
                    </label>
                    <label>Trolley
                        <input type="radio" name="body" onChange={e => e.target.value} value={trolleyInput}/>
                    </label>
                    <button>Send</button>
                    <button onClick={clearBtn}>Clear form</button>
                </form>
            </div>

        </>
    )
}
export default FirstPage;