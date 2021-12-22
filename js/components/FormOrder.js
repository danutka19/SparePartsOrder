import React, {useEffect, useState} from "react";
import data from "../data/data";

// const [spare, setSpare] = useState({
//     capacity: 500,
//     type: "500W14",
//     power: "400V",
//     suspension: "CE",
//     name: "chain sprocket",
//     drawing: "1A",
//     number: 11,
//     price: 54
// })

export const FormOrder = ({capacity, drawing, number}) => {
    const [statusOrder, setStatusOrder] = useState(false)
    const [spares, setSpares] = useState(data)

    useEffect(() => {
        console.log("Status order to: ");
        console.log(statusOrder); //tu juz aktualny stan

    }, [])

    const sendOrder = (e) => {
        e.preventDefault()
        setStatusOrder(true)
    }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <td>Lp.</td>
                    <td>Hoist type:</td>
                    <td>Capacity:</td>
                    <td>Spare part number:</td>
                    <td>Spare name:</td>
                    <td>Price:</td>
                    <td>Quantity:</td>
                    <td>Value:</td>
                </tr>
                </thead>
                <tbody>
                {spares.filter(spare => capacity === spare.capacity && drawing === spare.drawing && number === spare.number)
                    .map((spare) => {
                        return (
                            <tr>
                                <td>1</td>
                                <td>{spare.type}</td>
                                <td>{spare.capacity} kg</td>
                                <td>{spare.number}</td>
                                <td>{spare.name}</td>
                                <td>{spare.price} EUR</td>
                                <td>2</td>
                                <td>{spare.price * 2} EUR</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form action="" onSubmit={sendOrder}>
                <label>Write serial number of hoist:
                    <input type="text" onChange={e => e.target.value} placeholder={"e.g. 79797"}/>
                </label>
                <button className="btn">Send order</button>
            </form>

        </>
    )
}