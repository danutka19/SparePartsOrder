import React, {useState, useEffect} from "react";
import {BodyPage} from "./BodyPage";
import {createHoist} from "./Promise";

const HoistPage = ({onNewCapacity}) => {
    const [capacityInput, setCapacityInput] = useState("");
    const [bodyInput, setBodyInput] = useState(false);
    const [trolleyInput, setTrolleyInput] = useState(false)
    const [firstDisplay, setFirstDisplay] = useState(false);
    const [photoNumber, setPhotoNumber] = useState(0)

    useEffect(() => {
        if (capacityInput <= 500 && capacityInput > 0 && bodyInput === true) {
            setPhotoNumber("1A")
        } else if (capacityInput <= 2000 && capacityInput > 500 && bodyInput === true) {
            setPhotoNumber("2A")
        } else if (capacityInput <= 5000 && capacityInput > 2000 && bodyInput === true) {
            setPhotoNumber("3A")
        } else if (capacityInput > 0 && trolleyInput === true) {
            setPhotoNumber(4)
        } else if (capacityInput > 5000 && bodyInput === true) {
            console.warn("Podaj udźwig pomiędzy 125kg a 5000kg")
        }

        console.log(`wyswietlam status capacityInput: ${capacityInput}`);
        console.log(`wyswietlam status bodyInput: ${bodyInput}`)
    }, [bodyInput])

    const handleBtn = (e) => {
        e.preventDefault();
        setBodyInput(true); //jak działa radio, tak aby jeden miał true/false?
        const hoist = {
            capacityInput,
        }
        createHoist(hoist, onNewCapacity);
        console.log(`wyswietla hoist/ capacityInput: ${capacityInput}`);
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
            <BodyPage drawing={photoNumber} />
        </>
    )
}
export default HoistPage;