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
    ]); // neccessary to show photo
    const [number, setNumber] = useState(""); // temproray state from input with spare part number
    const [numberArray, setNumberArray] = useState([]); // setting spare parts
    const [sparesList, setSparesList] = useState([]);  // state sends up with spare parts list
    const navigate = useNavigate();

    // function sending array to FormOrder
    const handleBasketForm = (e) => {
        e.preventDefault();
        addToBasket(sparesList);
        console.log(`BodyPage, handleBasketForm, sparesList: ${sparesList}`);
        navigate('/order');
    }
    const addNumbers = (e) => {
        e.preventDefault();
        setNumberArray((prev) => [...prev, number]);
        setSparesList(prev => [...prev, sparesParts
            .filter(spares =>
                spares.drawing === drawingP &&
                spares.number === +number &&
                spares.capacity === +capacityP)[0]]);
    }
    const clearBtn = (e) => {
        e.preventDefault()
        setNumber(0);
        setNumberArray([]);
    }
    const handleHomeBtn = () => {
        navigate(`/`)
    }

    return (
        <>
            {drawingP.length === 0 ?
                <div className="information">
                Please choose your hoist:
                <button onClick={handleHomeBtn}>Choose your hoist</button>
                </div>
                :
                <form className="form"
                      onSubmit={handleBasketForm}>
                    <label>Write part of number:
                        <input type="text"
                               placeholder="e.g. 5"
                               maxLength={2}
                               value={number}
                               onChange={e => setNumber(e.target.value)}
                        />
                    </label>
                    <button onClick={addNumbers}>Add number of spare parts</button>
                    <div>Numbers of spare parts to order:
                        <p>{numberArray.join(`, `)} </p>
                    </div>
                    <button onClick={e => clearBtn(e)}>Clear basket</button>
                    <button>Add to basket</button>
                    {photo.filter((photo) => drawingP === photo.drawing)
                        .map((photo) => <img src={photo.path} alt="" key={photo.drawing}/>)}
                </form>
            }
        </>
    )
}