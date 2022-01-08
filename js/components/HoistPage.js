import React, {useState, useEffect} from "react";
import {createHoist} from "../data/createHoist";

const HoistPage = ({onNewCapacity}) => {
    const [capacityInput, setCapacityInput] = useState("");
    const [typeInput, setTypeInput] = useState("");
    const [powerInput, setPowerInput] = useState("");
    const [suspensionInput, setSuspensionInput] = useState("CS");
    const [bodyInput, setBodyInput] = useState(true); // body=true trolley=false, potem wyswietli odpowiedni rysunek body/trolley, domyslnie body
    const [firstDisplay, setFirstDisplay] = useState(false);
    const [photoNumber, setPhotoNumber] = useState("")

    const handleBtn = (e) => {
        e.preventDefault();
        setBodyInput(true);
        setFirstDisplay(true);
        console.log(`wyswietla hoist/ capacityInput: ${capacityInput} oraz ${photoNumber}`);
        // onNewCapacity(capacityInput);
        onNewCapacity(capacityInput);
    }

    const clearBtn = (e) => {
        e.preventDefault();
        setCapacityInput("");
        setBodyInput(true);
        setPhotoNumber("");
    }

    const handleSuspensionChange = (e) => {
        setSuspensionInput(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBodyInput(e.target.value)
    }

    return (
        <>
            <div className={firstDisplay ? "hidden" : ""}>
                <h3>Choose your chain hoist:</h3>
                <p>Please fill below datas to find neccessary spare(s)</p>
                <form action="" className="form" >
                    <label>Capacity:
                        <input type="text" onChange={e => setCapacityInput(e.target.value)} value={capacityInput} placeholder="e.g. 500" />[kg]
                    </label>
                    <label>Type:
                        <input type="text" onChange={e => setTypeInput(e.target.value)} value={typeInput} placeholder="e.g. 500W14"/>
                    </label>
                    <label>Power:
                        <input type="text" onChange={e => setPowerInput(e.target.value)} value={powerInput} placeholder="e.g. 400V"/>[V]
                    </label>
                    <label>Suspension:
                        <select onChange={handleSuspensionChange} value={suspensionInput} placeholder="choose">
                            <option value="top hook">TOP HOOK</option>
                            <option value="ce">ELECTRIC TROLLEY</option>
                            <option value="cs">PUSH TROLLEY</option>
                            <option value="eye">EYE SUSPENSION</option>
                            <option value="low headroom trolley">LOW HEADROOM TROLLEY</option>
                        </select>
                    </label>
                    <label>Body
                        <input type="radio" name="body" onChange={handleBodyChange} value={true}/>
                    </label>
                    <label>Trolley
                        <input type="radio" name="body" onChange={handleBodyChange} value={false}/>
                    </label>
                    <button onClick={handleBtn}>Send</button>
                    <button onClick={clearBtn}>Clear form</button>
                </form>
            </div>

        </>
    )
}
export default HoistPage;