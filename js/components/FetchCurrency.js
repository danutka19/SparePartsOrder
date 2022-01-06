import {useEffect, useState} from "react";
import React from "react";

const API = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/today/`
const nbp = `http://api.nbp.pl/api/`

// na dzien dzisiejszy
// http://api.nbp.pl/api/exchangerates/tables/{table}/today/

export const FetchCurrency = () => {
    const [currency, setCurrency] = useState(false);

    useEffect(() => {
        fetch(API, {
            method: "GET",
        }).then( resp => {
            if (resp.ok)
                return resp.text();
            else
                throw new Error('Błąd sieci!');
        }).then( currency => {
            console.log('Kurs waluty:', currency);
            setCurrency(currency)
        }).catch( err => {
            console.log('Błąd!', err);
        });
    }, []);

    if (currency === false) {
        return <div>Setting exchange rate...</div>
    } else {
        return <div>Kurs waluty: {parseFloat(currency.slice(111, 117))}</div>
    }
}