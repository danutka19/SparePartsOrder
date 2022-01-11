import React, {Component, useEffect, useState} from "react";
import {FetchCurrency} from "./FetchCurrency";

export const FormOrder = ({sparesP}) => {
    const [spares, setSpares] = useState(sparesP);
    const [sum, setSum] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [currency, setCurrency] = useState(4.57);
    const [statusOrder, setStatusOrder] = useState(false);

    useEffect(() => {
        setSum(spares
            .map(el => el.price*el.quantity)
            .reduce((prev, curr) => prev + curr));
    }, [spares])

    useEffect(() => {
        removeSpare()
    }, [spares])

    // funkcja zmieniająca quantity w Inpucie i uwzględniająca zmianę ilości DZIALA
    const handleInputQuantityChange = (id, e) => {
        setSpares(prev =>
            prev.map((spares) => {
                if (spares.id !== id) {
                    return spares;
                }
                return {
                    ...spares,
                    quantity: e
                }
            }))
    }

    const foo = (currency) => {
        setCurrency(currency.rates[0].mid, `=foo=`)
    }

    // funkcja dzięki której chciałabym wysłać dane do mnie na email
    const sendOrder = (e) => {
        e.preventDefault();
        setStatusOrder(true);
    }

    // funkcja usuwająca pozycję z koszyka i sumująca wszystkie usunięte pozycje po id DZIALA
    const removeSpare = (id) => () => {
        setSpares((prev) => prev.filter(spares => spares.id !== id))  // usuwa pozycje z koszyka
        const x = spares.filter(s => s.id === id).map((el, index) => el.price * el.quantity)
        setSum(prev => prev - x);
    }

    const handleInpSerial = (e) => {
        setSerialNumber(e.target.value);
    }

    return (
        <>
            <table className={statusOrder ? "hidden" : "table"}>
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
                                <td>{+spare.price} <i className="fas fa-euro-sign"></i></td>
                                <td><input type="number" min="0"
                                           placeholder="e.g. 2"
                                           className="input--quantity"
                                           value={spare.quantity}
                                           onChange={(e) => handleInputQuantityChange(spare.id, e.target.value)}
                                /></td>
                                <td>{spare.price * spare.quantity} <i className="fas fa-euro-sign"></i></td>
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
            <form className={statusOrder ? "hidden" : ""} action="" onSubmit={sendOrder}>
                <label>Write serial number of hoist:
                    <input type="text"
                           minLength="5"
                           maxLength="6"
                           value={serialNumber}
                           onChange={handleInpSerial}
                           placeholder={"e.g. 79797"}/>
                </label>
                <FetchCurrency fooP={foo}/>
                <div>Order value: {sum} <i className="fas fa-euro-sign"></i></div>
                <div>Order value: {(sum*currency).toFixed(2)} in pln</div>
                <button>Send order</button>
            </form>
            <form className={statusOrder ? "information" : "hidden"}>
                Placed the order for the following spare parts, with total value amounts: {(sum*currency).toFixed(2)} in PLN:
                <div>{spares.map(el => el.name).join(`, `)}</div>
                Spare parts should be compare with hoist serial number: {serialNumber}

            </form>
        </>
    )
}