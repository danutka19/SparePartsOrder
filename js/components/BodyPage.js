import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {sparesParts} from "../data/datas";

export const BodyPage = ({drawingP, capacityP, addToBasket}) => {
    const [photo, setPhoto] = useState([
        {
        drawing: "1A",
        path: "js/data/photo/drawing 1A W.jpg"
        },
        {
        drawing: "2A",
        path: "js/data/photo/drawing 2A WR.jpg"
        },
        {
        drawing: "3A",
        path: "js/data/photo/drawing 3A WR 3.4.5.jpg"
        },
        {
        drawing: "4B",
        path: "js/data/photo/trolley 4.jpg"
        }
    ]); // potrzebne do pokazania zdjęcia
    const [number, setNumber] = useState(""); // chwilowy stan inputa z nr części
    const [numberArray, setNumberArray] = useState([]); // dodaje i pokazuje numer części
    const [sparesList, setSparesList] = useState([]);  // stan wysyłany w górę, w którym chcę umieścić listę zamawianych części

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(`BodyPage, useEffect, numberArray: ${numberArray}`)
        // setNumberArray(prev => [...prev, number])
    }, [])

    // funkcja wysyłająca tablicę części zamiennych do FormOrder, na razie wysyła tablicę z numerami tychże części
    const handleBasketForm = (e) => {
        e.preventDefault();
        addToBasket(sparesList);
        console.log(`BodyPage, handleBasketForm, sparesList: ${sparesList}`);
        navigate('/order');
    }

    const addNumbers = (e) => {
        e.preventDefault();
        setNumberArray((prev) => [...prev, number]);
        const spare = (sparesParts
            .filter(spares => spares.drawing === drawingP && spares.number === +number && spares.capacity === +capacityP))[0]
        setSparesList(prev => [...prev, sparesParts
            .filter(spares =>
                spares.drawing === drawingP &&
                spares.number === +number &&
                spares.capacity === +capacityP)[0]]);
    }

    const handleInpNumber = (e) => {
        setNumber(e.target.value)
    }

    const clearBtn = (e) => {
        e.preventDefault()
        setNumber(0);
        setNumberArray([]);
    }

    return (
        <>
            <form className={drawingP === 0 ? "hidden" : "form"}
                  onSubmit={e => handleBasketForm(e)}>
                <label>Write part of number:
                    <input type="text"
                           placeholder="e.g. 5"
                           maxLength={2}
                           value={number}
                           onChange={handleInpNumber}
                    />
                </label>
                <button onClick={e => addNumbers(e)}>Add number of spare parts</button>
                <div>Numbers of spare parts to order:
                    <p>{numberArray.join(`, `)} </p>
                </div>
                <button onClick={e => clearBtn(e)}>Clear basket</button>
                <button>Add to basket</button>
                {photo.filter((photo) => drawingP === photo.drawing)
                    .map((photo) => <img src={photo.path} alt="" key={photo.drawing}/>)}
            </form>
        </>
    )
}