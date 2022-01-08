import React, {Component, useEffect, useState} from "react";
import {sparesParts} from "../data/datas";
import {FetchCurrency} from "./FetchCurrency";

// const [spare, setSpare] = useState({
//     capacity: 500,
//     type: "500W14",
//     power: "400V",
//     suspension: "CE",
//     name: "chain sprocket",
//     drawing: "1A",
//     number: 11,
//     price: 54,
//     id: 511
// })

export const FormOrder = ({capacity, drawing, number}) => {
    const [statusOrder, setStatusOrder] = useState(false)
    const [spares, setSpares] = useState([])
    const [quantity, setQuantity] = useState([1])
    const [sum, setSum] = useState("")
    const [serialNumber, setSerialNumber] = useState("")

    useEffect(() => {
        setSpares(sparesParts.filter((spare) => capacity === spare.capacity && drawing === spare.drawing));
        setSum(sparesParts.filter((spare) => capacity === spare.capacity && drawing === spare.drawing)
            .map(el => {
                return el.price*quantity
            })
            .reduce((prev, curr) => {
                return prev + curr
            }))
    }, [])

    // funkcja dzięki której chciałabym wysłać dane do mnie na email
    const sendOrder = (e) => {
        e.preventDefault()
        setStatusOrder(true)
    }

    // funkcja usuwająca pozycję z koszyka i sumująca wszystkie pozycje po usunięciu po id
    const removeSpare = (id) => () => {
        setSpares((prev) => prev.filter(spares => spares.id !== id))  // usuwa pozycje z koszyka
        const x = spares.filter(s => s.id === id).map(el => el.price * quantity)
        setSum(prev => prev - x);
    }

    const handleInpSerial = (e) => {
        setSerialNumber(e.target.value);
        console.log(serialNumber);
    }

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <td>Line:</td>
                    <td>Hoist type:</td>
                    <td>Capacity:</td>
                    <td>Spare part number:</td>
                    <td>Spare name:</td>
                    <td>Price:</td>
                    <td>Quantity:</td>
                    <td>Value:</td>
                    <td>Delete:</td>
                </tr>
                </thead>
                <tbody>
                {spares.map((spare, index) => {
                        return (
                            <tr key={spare.id}>
                                <td>{index + 1}</td>
                                <td>{spare.type}</td>
                                <td>{spare.capacity} kg</td>
                                <td>{spare.number}</td>
                                <td>{spare.name}</td>
                                <td>{parseFloat(spare.price)} <i className="fas fa-euro-sign"></i></td>
                                <td><input type="number" min="1"
                                           placeholder="e.g. 2"
                                           className="input--quantity"
                                           onChange={e => e.target.value}

                                />{quantity}</td>
                                {/*// usunac {quantity} pozniej*/}
                                <td>{spare.price * quantity} <i className="fas fa-euro-sign"></i></td>
                                {/*nalezy zmodyfikować ilość, aby się uaktualniała*/}
                                <td onClick={removeSpare(spare.id)}><i className="fas fa-trash"></i></td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td>Order value:</td>
                    <td>
                        {sum}
                        <i className="fas fa-euro-sign"></i>
                    </td>
                </tr>
                </tfoot>
            </table>
            <form action="" onSubmit={sendOrder}>
                <label>Write serial number of hoist:
                    <input type="text"
                           maxLength="6"
                           value={serialNumber}
                           onChange={handleInpSerial}
                           placeholder={"e.g. 79797"}/>
                </label>
                <FetchCurrency />
                <div>Order value: {sum}<i className="fas fa-euro-sign"></i></div>
                <div>Order value: {sum}</div>
                <button>Send order</button>
            </form>
        </>
    )
}