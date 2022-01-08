import React, {useEffect, useState} from "react";

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
    // const [numberX, setNumberX] = useState("");

    // useEffect(() => {
    //     console.log(`BodyPage, useEffect: ${number}`)
    // }, [])

    const handleBasketBtn = (e) => {
        e.preventDefault();
        // setNumberX(prev => [...prev, number])
        setNumber(e.target.value)
        addToBasket(number);
        console.log(capacity);
        console.log(drawingP);
        console.log(`BodyPage: ${number}`);
        // console.log(numberX);
    }

    // const handleInpNumber = (e) => {
    //     setNumber(e.target.value)
    // }

    return (
        <>
            <form className={drawingP === 0 ? "hidden" : "form"}
                  onSubmit={e => handleBasketBtn(e)}>
                <label>Write part of number:
                    <input type="text"
                           placeholder="e.g. 5"
                           maxLength={2}
                           value={number}
                           onChange={e => setNumber(e.target.value)}
                    />
                </label>
                <button>Add to basket</button>
                {photo.filter((photo) => drawingP === photo.drawing)
                    .map((photo) => <img src={photo.path} alt="" key={photo.drawing}/>)}

            </form>


        </>
    )
}