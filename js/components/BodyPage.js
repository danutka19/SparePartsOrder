import React, {useEffect, useState} from "react";

export const BodyPage = ({drawingP, capacityP}) => {
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
    const [number, setNumber] = useState("");
    const [drawing, setDrawing] = useState(drawingP);

    useEffect(() => {
        if (capacity <= 500 && capacity > 0 ) {
            setDrawing("1A")
        } else if (capacity <= 2000 && capacity > 500 && capacity !== 0) {
            setDrawing("2A")
        } else if (capacity <= 5000 && capacity > 2000 ) {
            setDrawing("3A")
        } else if (capacity === 0 ) {
            setDrawing("4B")
        } else if (capacity > 5000 ) {
            console.warn("Podaj udźwig pomiędzy 125kg a 5000kg")
            prompt("Please change capacity max 5000kg")
        }

    }, [])

    const handleBasketBtn = (e) => {
        e.preventDefault();
        setCapacity(capacityP);
        console.log(capacity);
        console.log(number);
    }

    const handleInpNumber = (e) => {
        setNumber(e.target.value)
        console.log(number)
    }

    return (
        <form className={drawing === 0 ? "hidden" : "form"}>
            <label>Write part of number:
                <input type="text" value={number} onChange={handleInpNumber} placeholder="e.g. 5"/>
            </label>
            {photo.filter((photo) => drawing === photo.drawing)
                .map((photo) => <img src={photo.path} alt="" key={photo.drawing}/>)}
            <button onClick={handleBasketBtn}
                    >Add to basket</button>
        </form>
    )
}