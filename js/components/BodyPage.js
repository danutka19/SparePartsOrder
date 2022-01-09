import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

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
    ]);
    const [capacity, setCapacity] = useState(capacityP);
    const [number, setNumber] = useState([]);
    const [numberArray, setNumberArray] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(`BodyPage, useEffect, numberArray: ${numberArray}`)
        // setNumberArray(prev => [...prev, number])
    }, [])

    const handleBasketBtn = (e) => {
        e.preventDefault();
        // setNumberArray((prev) => [...prev, number])
        addToBasket(numberArray);
        console.log(capacity);
        console.log(drawingP);
        console.log(`BodyPage, handleBasketBtn, number: ${number}`);
        console.log(`BodyPage, handleBasketBtn, numberArray: ${numberArray}`);
        navigate('/order');
    }

    const addNumbers = (e) => {
        e.preventDefault();
        setNumberArray((prev) => [...prev, number])
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
                  onSubmit={e => handleBasketBtn(e)}>
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
                    <p>{numberArray.map((el, index) => `${el}, `)} </p>
                </div>
                <button onClick={e => clearBtn(e)}>Clear basket</button>
                <button>Add to basket</button>
                {photo.filter((photo) => drawingP === photo.drawing)
                    .map((photo) => <img src={photo.path} alt="" key={photo.drawing}/>)}
            </form>
        </>
    )
}