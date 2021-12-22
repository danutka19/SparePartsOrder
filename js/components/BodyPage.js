import React, {useEffect, useState} from "react";

export const BodyPage = ({drawing}) => {
    const [photo, setPhoto] = useState([{
        drawing: "1A",
        path: "js/data/photo/drawing 1A W.jpg"
    }, {
        drawing: "2A",
        path: "js/data/photo/drawing 2A WR.jpg"
    }, {
        drawing: "3A",
        path: "js/data/photo/drawing 3A WR 3.4.5.jpg"
    }, {
        drawing: 4,
        path: "js/data/photo/trolley 4.jpg"
    }]);

    const handleBasketBtn = () => {
        return null
    }

    return (
        <form className={drawing === 0 ? "hidden" : "form"}>
            <label>Write part of number:
                <input type="text" onChange={e => e.target.value} placeholder="e.g. 5"/>
            </label>
            {photo.filter((photo) => drawing === photo.drawing)
                .map((photo) => <img src={photo.path} alt="" key={photo.drawing}/>)}
            <button onClick={handleBasketBtn}
                    >Add to basket</button>
        </form>
    )
}

