import React, {useState, useEffect} from "react";
import {createHoist} from "../data/createHoist";
import {sparesParts} from "../data/datas";
import {useNavigate} from 'react-router-dom'

const HoistPage = ({onNewCapacity}) => {
    const [capacityInput, setCapacityInput] = useState("");
    const [typeInput, setTypeInput] = useState("");
    const [powerInput, setPowerInput] = useState("");
    const [suspensionInput, setSuspensionInput] = useState("CS");
    const navigate = useNavigate();
    const [bodyInput, setBodyInput] = useState(true); // body=true trolley=false, potem wyswietli odpowiedni rysunek body/trolley, domyslnie body

    // sending capacity and drawing
    const handleForm = (e) => {
        e.preventDefault();
        setBodyInput(true);
        onNewCapacity(capacityInput, setDrawingNumber());
        console.log(`zwrot z formularza w HoistPage ${setDrawingNumber()} oraz ${capacityInput}`)
        navigate('/drawing')
    }
    // set number of drawing (which should show in BodyPage)
    const setDrawingNumber = () => {
        if (capacityInput <= 500 && capacityInput > 0 ) {
            return "1A"
        } else if (capacityInput <= 2000 && capacityInput > 500) {
            return "2A"
        } else if (capacityInput <= 5000 && capacityInput > 2000 ) {
            return "3A"
        } else if (capacityInput === 0 ) {
            return "4B"
        } else if (capacityInput > 5000 ) {
            console.warn("Podaj udźwig pomiędzy 125kg a 5000kg")
        }
    }

    const clearBtn = (e) => {
        e.preventDefault();
        setCapacityInput("");
        setBodyInput(true);
    }

    const handleSuspensionChange = (e) => {
        setSuspensionInput(e.target.value)
    }

    const handleBodyChange = (e) => {
        setBodyInput(e.target.value)
    }

    return (
        <>
            <div >
                <h3>Choose your chain hoist:</h3>
                <p>Please fill below datas to find neccessary spare(s)</p>
                <form action="" className="form" onSubmit={handleForm}>
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
                    <button>Send</button>
                    <button onClick={clearBtn}>Clear form</button>
                </form>
            </div>
        </>
    )
}
export default HoistPage;